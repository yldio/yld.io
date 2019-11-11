const mdx = require('@mdx-js/mdx');

/**
 * Before uploading to Contentful we should be sure that the
 * markdown we've generated can transpile to mdx correctly
 * otherwise we upload markdown that will break the build.
 */
const validateMdx = async posts => {
  for (const post of posts) {
    const { content, slug } = post;

    try {
      await mdx(content);
    } catch (error) {
      throw new Error(`Error transpiling post ${slug}`, error);
    }
  }
};

module.exports = validateMdx;
