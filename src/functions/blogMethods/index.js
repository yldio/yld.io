/* eslint-disable no-console */
const { default: Map } = require('apr-map')
const Waterfall = require('apr-waterfall')
const Reduce = require('apr-reduce')

const isProd = require('../utils/is-prod')
const ParseXMLToJSON = require('./parse-xml-to-json')
const ParseHtmlToMd = require('./parse-html-to-markdown')
const TransformCustomMDX = require('./transform-custom-mdx')
const PublishToContentful = require('./publish-to-contentful')
const TranspileAllPosts = require('./transpile-all-posts')
const TransformMetaData = require('./transform-meta-data')

const { createClient } = require('contentful-management')
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env

const client = createClient({
  accessToken: CMS_CRUD
})

const environmentName = isProd ? 'master' : 'development'

const getContentTypeFields = ct =>
  ct.fields.reduce(
    ({ allFields = [], requiredFields = [] }, { required, id }) => ({
      allFields: allFields.concat(id),
      requiredFields: required ? requiredFields.concat(id) : requiredFields
    }),
    []
  )

module.exports = async data => {
  if (!data || !Array.isArray(data)) {
    throw new Error('Missing data', data)
  }

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment(environmentName)
  const contentType = await environment.getContentType('blogPost')

  const { allFields, requiredFields } = getContentTypeFields(contentType)

  const { items: cmsBlogPosts } = await environment.getEntries({
    limit: 1000,
    content_type: 'blogPost'
  })

  const incompletePosts = cmsBlogPosts
    .filter(({ fields }) => !requiredFields.every(field => fields[field]))
    .map(p => p.fields.title['en-US'])

  const postTitleIDMap = cmsBlogPosts.reduce((acc, curr) => {
    // Cannot use slug as hash on end of medium slug changes
    // e.g. blog-post-title-9231239sd => blog-post-title-89120302
    const title = curr.fields.title['en-US']
    const id = curr.sys.id

    return {
      ...acc,
      [title]: id
    }
  }, {})

  const FilterPostsToProcess = posts => {
    const toProcess = posts.filter(({ title }) => {
      return incompletePosts.includes(title)
    })

    console.info(`Process posts: ${toProcess.map(({ title }) => `\n${title}`)}`)

    return toProcess
  }

  let posts

  try {
    posts = await Waterfall([
      async () =>
        Reduce(data, async (sum = [], acc) =>
          sum.concat(await ParseXMLToJSON(acc))
        ),
      posts => FilterPostsToProcess(posts),
      async posts => Map(posts, async post => ParseHtmlToMd(post, environment)),
      async posts => TransformCustomMDX(posts, environment),
      async posts => TransformMetaData(posts),
      async posts => TranspileAllPosts(posts)
    ])
  } catch (error) {
    console.error('WATERFALL ERROR')
    throw new Error(error)
  }

  if (isProd && posts) {
    console.info('Publishing to contentful')
    return await PublishToContentful(
      posts,
      environment,
      allFields,
      postTitleIDMap
    )
  }

  return posts
}
