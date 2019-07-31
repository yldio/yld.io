import IsNull from 'lodash.isnull'

/**
 *
 * Because og:image doesn't accept svgs, we sometimes have to use
 * a different asset to the posterImage to be able to render the
 * poster image when we share a link on social media. This is
 * predominantly used for case studies but is page agnostic.
 *
 * At time of writing (30/7/19) only case study content types have this ogImageMeta
 * field set up to use!
 *
 */
export default ({ posterImage, ogImageMeta }) =>
  (IsNull(ogImageMeta) ? posterImage.file : ogImageMeta.file).url
