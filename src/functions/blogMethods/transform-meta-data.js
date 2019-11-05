const { default: Map } = require('apr-map')

module.exports = posts =>
  Map(posts, post => {
    // Uses the assetId from the contentful image upload
    // response. Means Gatsby will download the image from
    // contentful when the site builds
    const headerImage =
      post.relatedMedia && post.relatedMedia.length > 0
        ? post.relatedMedia[0]
        : undefined

    return {
      ...post,
      headerImage
    }
  })
