/* eslint-disable no-unused-vars */
/**
 * This is just a simple script that can be used when you want
 * to check the return values from the contentful API and try
 * to understand what gatsby-source-contentful is doing behind
 * the sceens when it's inferring typings from the CMS.
 *
 * Change the `content_type` value to the content type return
 * value that you want to see the raw data of, then run:
 *
 * `node contentful-check.js
 *
 */

const Main = require('apr-main');
const { createClient } = require('contentful-management');
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env;

const client = createClient({
  accessToken: CMS_CRUD,
});

Main(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE);
  const environment = await space.getEnvironment('master');

  // const { items: cmsBlogPosts } = await environment.getEntries({
  //   limit: 1000,
  //   content_type: 'blogPost'
  // })

  // console.log(JSON.stringify({ items }, null, 2))

  // const contentType = await environment.getContentType('blogPost')
  // const { items, ...rest } = await environment.getEntries({
  //   limit: 1000,
  //   content_type: 'blogPost'
  // })

  // const { requiredFields } = contentType.fields.reduce(
  //   ({ allFields = [], requiredFields = [] }, { required, id }) => ({
  //     allFields: allFields.concat(id),
  //     requiredFields: required ? requiredFields.concat(id) : requiredFields
  //   }),
  //   []
  // )

  // const incompletePosts = cmsBlogPosts
  //   .filter(({ fields }) => !requiredFields.every(field => fields[field]))
  //   .map(p => p.fields.title['en-US'])
  // console.log(JSON.stringify({ incompletePosts }, null, 2))
});
