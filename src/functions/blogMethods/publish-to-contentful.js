/* eslint-disable no-console */
const { default: Map } = require('apr-map');
const { LOCALE } = require('../utils/constants');

const generateContentfulEntryFromPost = (post, keys) =>
  keys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        [LOCALE]: post[curr],
      },
    }),
    {},
  );

const publishToContentful = async (
  posts,
  environment,
  allFields,
  cmsBlogPosts,
) => {
  return Map(posts, async (post) => {
    const asset = cmsBlogPosts.find(
      ({
        fields: {
          slug: { [LOCALE]: slug },
        },
      }) => slug === post.slug,
    );

    const contentfulPostData = generateContentfulEntryFromPost(
      { ...post, publish: true },
      [...allFields, 'publish'],
    );

    if (asset) {
      console.info(`Updating post: ${post.title}`);

      asset.fields = {
        ...asset.fields,
        ...contentfulPostData,
      };
      const updatedAsset = await asset.update();

      return updatedAsset.publish();
    }

    console.info(`Creating new post: ${post.title}`);

    const newAsset = await environment.createEntry('blogPost', {
      fields: contentfulPostData,
    });

    return newAsset.publish();
  });
};

module.exports = publishToContentful;
