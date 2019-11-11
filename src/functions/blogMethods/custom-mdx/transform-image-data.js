const { default: Map } = require('apr-map')

const UploadToContentful = require('./upload-image-to-contentful')
const isProd = require('../../utils/is-prod')

const transformImageData = async (post, environment) => {
  const { content, images, title: postTitle } = post
  let transformedContent = content

  // Upload images to Contentful from medium url
  const uploadedImageData = await Map(images, async image => {
    let url
    let id

    if (isProd) {
      ;({ id, url } = await UploadToContentful(image, postTitle, environment))
    } else {
      url = 'https://example.com/img.jpg'
      id = '123'
    }

    const { name, alt, caption } = image
    const captionProp = caption ? ` caption="${caption}"` : ''
    const altProp = alt ? ` alt="${alt}"` : ''

    transformedContent = transformedContent.replace(
      `<image:${name}>`,
      `<FigureImage src="${url}"${captionProp}${altProp} />`,
    )

    return {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id,
      },
    }
  })

  return {
    ...post,
    relatedMedia: uploadedImageData,
    content: transformedContent,
  }
}

module.exports = transformImageData
