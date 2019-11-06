/* eslint-disable no-console */
const { default: Map } = require('apr-map')

const locale = 'en-US'

const generateContentfulEntryFromPost = (post, keys, locale) =>
  keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        [locale]: post[curr]
      }
    }),
    {}
  )

const publishToContentful = async (
  posts,
  environment,
  allFields,
  cmsBlogPosts
) => {
  return Map(posts, async post => {
    const asset = cmsBlogPosts.find(
      ({
        fields: {
          slug: { [locale]: slug }
        }
      }) => slug === post.slug
    )

    const contentfulPostData = generateContentfulEntryFromPost(
      post,
      allFields,
      locale
    )

    if (asset) {
      console.info(`Updating post: ${post.title}`)

      asset.fields = {
        ...asset.fields,
        ...contentfulPostData
      }
      const updatedAsset = await asset.update()

      return await updatedAsset.publish()
    } else {
      console.info(`Creating new post: ${post.title} `)

      const newAsset = await environment.createEntry('blogPost', {
        fields: contentfulPostData
      })

      return await newAsset.publish()
    }
  })
}

module.exports = publishToContentful
