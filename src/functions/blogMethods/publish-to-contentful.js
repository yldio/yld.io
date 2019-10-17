/* eslint-disable no-console */
const { default: Map } = require('apr-map')
const Intercept = require('apr-intercept')

const postToCmsKeysMap = {
  content: 'md'
}

const locale = 'en-US'

const generateContentfulEntryFromPost = (post, keys, locale) =>
  keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        [locale]: post[postToCmsKeysMap[curr]] || post[curr]
      }
    }),
    {}
  )

module.exports = async (posts, environment, allFields, postTitleIDMAp) =>
  Map(posts, async post => {
    const id = postTitleIDMAp[post.title]

    const contentfulPostData = generateContentfulEntryFromPost(
      post,
      allFields,
      locale
    )

    let asset
    if (id) {
      console.info(`Updating post: ${post.title} `)
      asset = await environment.getEntry(id)

      asset.fields = {
        ...asset.fields,
        ...contentfulPostData
      }

      const [updateErr, updatedAsset] = await Intercept(asset.update())

      if (updateErr) {
        console.error(`Update for ${post.title} failed: `, updateErr)
      }

      const [publishErr] = await Intercept(updatedAsset.publish())

      if (publishErr) {
        console.error(`Publish for ${post.title} failed: `, publishErr)
      }
    } else {
      console.info(`Creating new post: ${post.title} `)
      const newPost = await environment.createEntry('blogPost', {
        fields: contentfulPostData
      })

      asset = await environment.getEntry(newPost.sys.id)

      const [err] = await Intercept(asset.publish())

      if (err) {
        console.error(`Create post for ${post.title} failed: `, err)
      }
    }

    return asset
  })
