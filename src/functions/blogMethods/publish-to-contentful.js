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
      console.log(`Updating post: ${post.title} `)
      asset = await environment.getEntry(id)

      asset.fields = {
        ...asset.fields,
        ...contentfulPostData
      }

      const [err] = await Intercept(asset.update())

      if (err) {
        console.log(`Update for ${post.title} failed: `, err)
      }
    } else {
      console.log(`Creating new post: ${post.title} `)
      const newPost = await environment.createEntry('blogPost', {
        fields: contentfulPostData
      })

      asset = await environment.getEntry(newPost.sys.id)

      const [err] = await Intercept(asset.publish())

      if (err) {
        console.log(`Create post for ${post.title} failed: `, err)
      }
    }

    return asset
  })
