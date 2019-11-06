const { default: Map } = require('apr-map')
const Waterfall = require('apr-waterfall')

const TransformImageData = require('./transform-image-data')
const TransformIFrames = require('./transform-iframes')
const TransformStrings = require('./transform-strings')
const AddFrontMatter = require('./add-frontmatter.js')

module.exports = async (posts, environment) => {
  return Map(posts, async post =>
    Waterfall([
      async () => TransformImageData(post, environment),
      async post => TransformIFrames(post),
      async post => TransformStrings(post),
      async post => ({ ...post, content: AddFrontMatter(post) })
    ])
  )
}
