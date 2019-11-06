const { default: Map } = require('apr-map')

const UploadToContentful = require('./upload-image-to-contentful')
const isProd = require('../../utils/is-prod')

const transformImageData = async (post, environment) => {
  const { content, images, title: postTitle } = post
  let transformedContent = content

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

    const captionProp = cmsCaption ? ` caption="${cmsCaption}"` : ''
    const altProp = cmsAlt ? ` alt="${cmsAlt}"` : ''

    transformedContent = transformedContent.replace(
      `<image:${cmsFileName}>`,
      `<FigureImage src="${cmsUrl}"${captionProp}${altProp} />`
    )

    return {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: cmsAssetId
      }
    }
  })

  return {
    ...post,
    relatedMedia: uploadedImageData,
    content: transformedContent
  }
}

module.exports = transformImageData
