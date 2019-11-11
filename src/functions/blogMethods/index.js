/* eslint-disable no-console */
const GetContentTypeFields = require('../utils/get-content-type-fields');
const isProd = require('../utils/is-prod');
const ParseXMLToJSON = require('./parse-xml-to-json');
const TransformHtmlToMd = require('./transform-html-to-markdown');
const TransformCustomMDX = require('./custom-mdx');
const PublishToContentful = require('./publish-to-contentful');
const FilterPostsToProcess = require('./filter-posts-to-process');
const ValidateMdx = require('./validate-mdx');
const TransformMetaData = require('./transform-meta-data');

const { createClient } = require('contentful-management');
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env;

const client = createClient({
  accessToken: CMS_CRUD,
});

const environmentName = isProd ? 'master' : 'development';

const syncMediumToContentful = async data => {
  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment(environmentName);
  const contentType = await environment.getContentType('blogPost');

  const { allFields, requiredFields } = GetContentTypeFields(contentType);

  const { items: cmsBlogPosts } = await environment.getEntries({
    limit: 1000,
    content_type: 'blogPost',
  });

  const parsedPostsInJson = await ParseXMLToJSON(data);

  const postsToProcess = FilterPostsToProcess(parsedPostsInJson, {
    cmsBlogPosts,
    requiredFields,
  });

  const postsWithAddedMarkdown = await TransformHtmlToMd(postsToProcess);

  const postsWithAddedMDX = await TransformCustomMDX(
    postsWithAddedMarkdown,
    environment,
  );

  const postsWithMetaData = TransformMetaData(postsWithAddedMDX);

  await ValidateMdx(postsWithMetaData);

  if (isProd) {
    return await PublishToContentful(
      postsWithMetaData,
      environment,
      allFields,
      cmsBlogPosts,
    );
  }

  return postsWithMetaData;
};

module.exports = syncMediumToContentful;
