const { default: Map } = require('apr-map');

const TransformImageData = require('./transform-image-data');
const TransformIFrames = require('./transform-iframes');
const TransformStrings = require('./transform-strings');
const AddFrontmatter = require('./add-frontmatter');

module.exports = async (posts, environment) => {
  return Map(posts, async post => {
    const postWithImageData = await TransformImageData(post, environment);
    const postWithEmbedTags = await TransformIFrames(postWithImageData);
    const postWithReplacedStrings = {
      ...postWithEmbedTags,
      content: await TransformStrings(postWithEmbedTags.content),
    };
    const postWithFrontmatter = {
      ...postWithReplacedStrings,
      content: await AddFrontmatter(postWithReplacedStrings),
    };
    return postWithFrontmatter;
  });
};
