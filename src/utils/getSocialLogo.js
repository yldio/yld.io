import IsNull from 'lodash.isnull'

export default ({ posterImage, ogImageMeta }) =>
  (IsNull(ogImageMeta) ? posterImage.file : ogImageMeta.file).url
