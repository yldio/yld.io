const { URL } = require('url')
const { default: Map } = require('apr-map')
const slugify = require('@sindresorhus/slugify')

module.exports = posts =>
  Map(posts, post => {
    const slug = slugify(new URL(post.slug).pathname)

    // Uses the assetId from the contentful image upload
    // response. Means Gatsby will download the image
    const headerImage =
      post.uploadedImages && post.uploadedImages.length > 0
        ? {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: post.uploadedImages[0].assetId
            }
          }
        : undefined

    return {
      ...post,
      slug,
      headerImage
    }
  })
