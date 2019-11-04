const mdx = require('@mdx-js/mdx')

/**
 * Before uploading to Contentful we should be sure that the
 * markdown we've generated can transpile to mdx correctly
 * otherwise we upload markdown that will break the build.
 */

module.exports = async posts => {
  for (const post of posts) {
    const { md, slug } = post

    try {
      await mdx(md)
    } catch (error) {
      throw new Error(`Error transpiling post ${slug}`, error)
    }
  }

  return posts
}
