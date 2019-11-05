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

const generatePostSlugIDMap = posts =>
  posts.reduce((acc, curr) => {
    const title = curr.fields.slug['en-US']
    const id = curr.sys.id

    return {
      ...acc,
      [title]: id
    }
  }, {})
module.exports = async (posts, environment, allFields, cmsBlogPosts) => {
  const postSlugIdMap = generatePostSlugIDMap(cmsBlogPosts)

  return Map(posts, async post => {
    const id = postSlugIdMap[post.slug]

    const contentfulPostData = generateContentfulEntryFromPost(
      post,
      allFields,
      locale
    )

    let asset
    if (id) {
      console.info(`Updating post: ${post.title}`)
      asset = await environment.getEntry(id)

      asset.fields = {
        ...asset.fields,
        ...contentfulPostData
      }

      const [updateErr, updatedAsset] = await Intercept(asset.update())

      if (updateErr) {
        console.error(`Update for ${post.title} failed due to: `, updateErr)

        return `An error occured whilst updating post ${post.title}, see logs`
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
}
