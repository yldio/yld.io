/* eslint-disable no-console */
const { default: Map } = require('apr-map')
const Reduce = require('apr-reduce')
const EmojiStrip = require('emoji-strip')

const isProd = require('../utils/is-prod')
const ParseXMLToJSON = require('./parse-xml-to-json')
const ParseHtmlToMd = require('./parse-html-to-markdown')
const TransformCustomMDX = require('./transform-custom-mdx')
const PublishToContentful = require('./publish-to-contentful')
const ValidateMdx = require('./validate-mdx')
const TransformMetaData = require('./transform-meta-data')

const { createClient } = require('contentful-management')
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env

const client = createClient({
  accessToken: CMS_CRUD
})

const environmentName = isProd ? 'master' : 'development'

// We don't want to publish certain posts
const restrictredPosts = [
  'node-js-databases-using-redis-for-fun-and-profit-af61f9d0e49f', // Content is too long for Contentful
  'node-js-databases-using-couchdb-5135f6f45dc1' // Content is too long for Contentful
]

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

  const cmsPostSlugs = cmsBlogPosts.map(({ fields }) => fields.slug['en-US'])

  const incompletePosts = cmsBlogPosts
    .filter(({ fields }) => !requiredFields.every(field => fields[field]))
    .map(p => EmojiStrip(p.fields.slug['en-US']))

  const postSlugIDMap = cmsBlogPosts.reduce((acc, curr) => {
    const title = curr.fields.slug['en-US']
    const id = curr.sys.id

    return {
      ...acc,
      [title]: id
    }
  }, {})

  const FilterPostsToProcess = posts => {
    const newPosts = posts.filter(({ slug }) => !cmsPostSlugs.includes(slug))

    const postsToUpdate = posts.filter(
      ({ slug }) =>
        incompletePosts.includes(slug) && !restrictredPosts.includes(slug)
    )

    const result = postsToUpdate.concat(newPosts)

    if (newPosts.length && newPosts.length > 0) {
      console.info(`New Posts: ${newPosts.map(({ title }) => title)}`)
    } else {
      console.info(`No new posts to publish`)
    }

    if (postsToUpdate.length && postsToUpdate.length > 0) {
      console.info(
        `Posts to update: ${postsToUpdate.map(({ title }) => `\n${title}`)}`
      )
    } else {
      console.info(`No posts to update`)
    }

    return result
  }

  let posts

  try {
    const parsedPostsInJson = async () =>
      Reduce(data, async (sum = [], acc) =>
        sum.concat(await ParseXMLToJSON(acc))
      )

    const postsToProcess = FilterPostsToProcess(parsedPostsInJson)
    const postsWithAddedMarkdown = await Map(postsToProcess, async post =>
      ParseHtmlToMd(post)
    )
    const postsWithAddedMDX = TransformCustomMDX(
      postsWithAddedMarkdown,
      environment
    )
    const postsWithMetaData = TransformMetaData(postsWithAddedMDX)

    await ValidateMdx(postsWithMetaData)

    posts = postsWithMetaData
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
      postSlugIDMap
    )
  }

  return posts
}
