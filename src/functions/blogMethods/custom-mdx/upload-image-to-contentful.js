const KebabCase = require('lodash.kebabcase')
const mime = require('mime-types')
const { LOCALE } = require('../../utils/constants')
const uploadImageToContentful = async (
  { name, src, ext },
  title,
  environment,
) => {
  const asset = await environment.createAsset({
    fields: {
      title: {
        [LOCALE]: `${KebabCase(title)}__${name}`,
      },
      file: {
        [LOCALE]: {
          fileName: name,
          upload: src,
          contentType: mime.lookup(ext),
        },
      },
    },
  })
  const processedAsset = await asset.processForAllLocales()
  const {
    fields: {
      file: {
        [LOCALE]: { url },
      },
    },
    sys: { id },
  } = await processedAsset.publish()

  return { id, url }
}

module.exports = uploadImageToContentful
