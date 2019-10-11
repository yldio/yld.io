const { default: Map } = require('apr-map')
const Waterfall = require('apr-waterfall')
const Reduce = require('apr-reduce')

const isProd = require('../../utils/is-prod')
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

module.exports = async data => {
  if (!data || !Array.isArray(data)) {
    throw new Error('Missing data', data)
  }

  const space = await client.getSpace(CONTENTFUL_SPACE)
  const environment = await space.getEnvironment(environmentName)

  const { items: publishedBlogPosts } = await environment.getEntries({
    limit: 1000,
    content_type: 'blogPost'
  })

  const allPublishedBlogPostSlugs = publishedBlogPosts.map(
    ({ fields }) => fields.slug['en-US']
  )

  let posts

  try {
    posts = await Waterfall([
      async () =>
        Reduce(data, async (sum = [], acc) =>
          sum.concat(await ParseXMLToJSON(acc))
        ),
      posts =>
        posts.filter(({ slug }) => !allPublishedBlogPostSlugs.includes(slug)),
      async posts => Map(posts, async post => ParseHtmlToMd(post, environment)),
      async posts => TransformCustomMDX(posts, environment),
      async posts => TransformMetaData(posts),
      async posts => TranspileAllPosts(posts),
      async posts => Promise.all(posts).then(res => Promise.resolve(res))
    ])
  } catch (error) {
    throw new Error(error)
  }

  let cmsPosts

  if (isProd && posts) {
    cmsPosts = await PublishToContentful(posts, environment)
  }

  return cmsPosts
}
