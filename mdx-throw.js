const mdx = require('@mdx-js/mdx')
/**
 *
 *
 * Before uploading to Contentful we should be sure that the
 * markdown we've generated can transpile to mdx correctly
 * otherwise we upload markdown that will break the build.
 */

module.exports.handler = async () => {
  const arr = [
    {
      slug: 'slug-of-the-first-post',
      md: '# Blog title\n\n<Re'
    }
  ]

  for (const post of arr) {
    const { md } = post

    try {
      await mdx(md, {
        skipExport: true
      })
    } catch (error) {
      Promise.catch(new Error(error))
    }

    return post
  }
}
