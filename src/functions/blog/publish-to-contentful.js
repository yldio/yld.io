const { default: Map } = require('apr-map')

const postToCmsKeysMap = {
  content: 'md'
}

const contentfulEntryKeys = [
  'title',
  'firstPublishedAt',
  'headerImage',
  'slug',
  'tags',
  'authorName',
  'content'
]

const locale = 'en-US'

const generateContentfulEntryFromPost = (post, keys, locale) => ({
  fields: keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        [locale]: post[postToCmsKeysMap[curr]] || post[curr]
      }
    }),
    {}
  )
})

module.exports = async (posts, environment) =>
  Map(posts, async post => {
    const contentfulPostData = generateContentfulEntryFromPost(
      post,
      contentfulEntryKeys,
      locale
    )

    const newPost = await environment.createEntry(
      'blogPost',
      contentfulPostData
    )

    const asset = await environment.getEntry(newPost.sys.id)

    await asset.publish()
    return asset
  })
