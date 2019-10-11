const mdx = require('@mdx-js/mdx')

/**
 * Before uploading to Contentful we should be sure that the
 * markdown we've generated can transpile to mdx correctly
 * otherwise we upload markdown that will break the build.
 */
const transpile = async md => {
  const jsx = await mdx(md)
  return jsx
}

module.exports = posts =>
  posts.map(async post => {
    const { md, slug } = post
    try {
      await transpile(md)
    } catch (error) {
      throw new Error(`Error transpiling post ${slug}`, error)
    }

    return post
  })
