const UploadToContentful = require('./upload-image-to-contentful')
const { default: Map } = require('apr-map')
const isProd = require('../utils/is-prod')

module.exports = async (post, environment) => {
  const { md, images = [], title: postTitle } = post
  let transformedMd = md

  // Upload images to Contentful from medium url
  const uploadedImageData = await Map(images, async image => {
    let cmsUrl
    let cmsCaption
    let cmsAlt
    let cmsFileName
    let cmsAssetId

    if (isProd) {
      const { url, caption, alt, fileName, assetId } = await UploadToContentful(
        image,
        postTitle,
        environment
      )

      cmsUrl = url
      cmsCaption = caption
      cmsAlt = alt
      cmsFileName = fileName
      cmsAssetId = assetId
    } else {
      cmsUrl = 'https://foo.imges/'
      cmsCaption = 'A Bunch of Foo'
      cmsAlt = 'Some more foo'
      cmsFileName = image.name
      cmsAssetId = '123'
    }

    const captionProp = cmsCaption ? `caption="${cmsCaption}"` : ''
    const altProp = cmsAlt ? `alt="${cmsAlt}"` : ''

    transformedMd = transformedMd.replace(
      `<image:${cmsFileName}>`,
      `<FigureImage src="${cmsUrl}" ${captionProp} ${altProp} />`
    )

    return {
      src: cmsUrl,
      caption: cmsCaption,
      alt: cmsAlt,
      fileName: cmsFileName,
      assetId: cmsAssetId
    }
  })

  return {
    ...post,
    uploadedImages: uploadedImageData,
    md: transformedMd
  }
}
