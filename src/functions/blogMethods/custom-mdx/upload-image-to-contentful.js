const KebabCase = require('lodash.kebabcase')

const uploadImageToContentful = async (
  { caption, name, ext, src },
  title,
  environment
) => {
  const asset = await environment.createAsset({
    fields: {
      title: {
        'en-US': `${KebabCase(title)}__${name}` || caption || name
      },
      file: {
        'en-US': {
          contentType: `image/${ext.slice(1)}`,
          fileName: name,
          upload: src
        }
      }
    }
  })

  const { fields, sys } = await asset.processForAllLocales()

  // Publish asset
  const draftAsset = await environment.getAsset(sys.id)
  await draftAsset.publish()

  const contentfulTitle = fields.title['en-US']
  const imgData = fields.file['en-US']

  return {
    ...imgData,
    assetId: sys.id,
    title: contentfulTitle
  }
}

module.exports = uploadImageToContentful
