const getAllBlogPosts = async (environment) => {
  let total = Number.POSITIVE_INFINITY;
  const items = [];

  while (items.length < total) {
    // eslint-disable-next-line no-await-in-loop
    const { items: cmsPosts, total: cmsTotal } = await environment.getEntries({
      content_type: 'blogPost',
      limit: 1000,
      skip: items.length,
    });

    items.push(...cmsPosts);
    total = cmsTotal;
  }

  return items;
};

module.exports = getAllBlogPosts;
