const transformMetaData = posts =>
  posts.map(post => ({
    ...post,
    // Uses the assetId from the contentful image upload
    // response. Means Gatsby will download the image from
    // contentful when the site builds
    headerImage: post.relatedMedia[0], // may be undefined
  }));

module.exports = transformMetaData;
