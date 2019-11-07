const KebabCase = require('lodash.kebabcase')
const mime = require('mime-types')

const uploadImageToContentful = async (
  { name, src, ext },
  title,
  environment
) => {
  const asset = await environment.createAsset({
    fields: {
      title: {
        'en-US': `${KebabCase(title)}__${name}`
      },
      file: {
        'en-US': {
          fileName: name,
          upload: src,
          contentType: mime.lookup(ext)
        }
      }
    }
  })
  const processedAsset = await asset.processForAllLocales()
  const {
    fields: {
      file: {
        'en-US': { url }
      }
    },
    sys: { id }
  } = await processedAsset.publish()

  return { id, url }
}

module.exports = uploadImageToContentful
