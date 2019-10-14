const { default: Map } = require('apr-map')

module.exports = async posts =>
  Map(posts, post => {
    // Uses the assetId from the contentful image upload
    // response. Means Gatsby will download the image from
    // contentful when the site builds
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
      headerImage
    }
  })
