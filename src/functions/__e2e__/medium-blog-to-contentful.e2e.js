jest.setTimeout(120000);

jest.mock('../utils/auth');
jest.mock('../utils/is-prod', () => true);

const { createClient } = require('contentful-management');
const testUtils = require('@contentful/integration-test-utils');
const contentfulExport = require('contentful-export');
const contentfulImport = require('contentful-import');
const { readFileSync } = require('fs');
const nock = require('nock');
const { resolve } = require('path');

const mediaRedirects = require('../__fixtures__/medium-media-redirects');
const { handler } = require('../medium-blog-to-contentful');

// Medium nock
const nockFeed = (feed) => {
  const source = readFileSync(
    resolve(__dirname, `../__fixtures__/medium-feed-${feed}.xml`),
  );

  const headers = {
    'content-type': 'text/xml; charset=UTF-8',
  };

  return nock('https://medium.com')
    .get('/feed/yld-blog')
    .reply(200, source, headers);
};

beforeEach(() => {
  const mediaPathRegex = /\/media\/([0-9a-f]{32})\/href/;

  return nock('https://medium.com')
    .get(mediaPathRegex)
    .times(Object.keys(mediaRedirects).length)
    .reply((uri) => {
      const [, id] = mediaPathRegex.exec(uri);
      const location = mediaRedirects[id];
      return location ? [302, null, { location }] : [404];
    });
});

afterEach(nock.cleanAll);

// Contentful setup / teardown
const { CMS_CRUD, CONTENTFUL_SPACE } = process.env;
const client = createClient({
  accessToken: CMS_CRUD,
});

let testEnvironment;
let testSpace;

beforeAll(async () => {
  const content = await contentfulExport({
    managementToken: CMS_CRUD,
    spaceId: CONTENTFUL_SPACE,
    includeArchived: false,
    includeDrafts: false,
    skipContent: true,
    skipContentModel: false,
    skipEditorInterfaces: true,
    skipRoles: true,
    skipWebhooks: true.valueOf,
    useVerboseRenderer: true,
    saveFile: false,
  });

  testSpace = await testUtils.createTestSpace({
    client,
    language: 'JS',
    testSuiteName: 'test:e2e:lambda',
  });

  testEnvironment = await testSpace.getEnvironment('master');

  await contentfulImport({
    managementToken: CMS_CRUD,
    spaceId: testSpace.sys.id,
    environmentId: testEnvironment.sys.id,
    content,
    contentModelOnly: true,
  });
}, 120000);

afterAll(async () => {
  await testSpace.delete();
});

test('initial sync', async () => {
  nockFeed('2nd-3rd');

  await handler({}, { spaceId: testSpace.sys.id });

  const posts = await testEnvironment.getEntries({
    limit: 10,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
  });

  expect(posts.items).toHaveLength(2);
  const lambdaPost = posts.items.find((post) => {
    return post.fields.slug['en-US'] === 'reduce-bloat-of-your-lambdas';
  });

  expect(lambdaPost.isDraft()).toBe(true);
  // additional post to check a different embed type
  const reactGirlsPost = posts.items.find((post) => {
    return post.fields.slug['en-US'] === 'reactjs-girls-the-conference';
  });

  expect(reactGirlsPost.isDraft()).toBe(true);

  // meta
  expect(lambdaPost).toHaveProperty(
    'fields.title.en-US',
    'Reduce bloat of your Lambdas',
  );

  expect(lambdaPost).toHaveProperty('fields.authorName.en-US', 'Sérgio Ramos');

  expect(lambdaPost).toHaveProperty('fields.tags.en-US', [
    'lambda',
    'aws',
    'javascript',
    'performance',
    'serverless',
  ]);

  // content
  const lambdaPostContent = lambdaPost.fields.content['en-US'];
  const reactGirlsPostContent = reactGirlsPost.fields.content['en-US'];
  expect(lambdaPostContent).toContain('With most common JavaScript projects');
  expect(lambdaPostContent).toContain(
    '---\ntitle: Reduce bloat of your Lambdas\n',
  );

  expect(lambdaPostContent).toMatch(
    /<FigureImage src="\/\/images.ctfassets.net\/.+\/.+\/.+\/1_p_IgJZXI_556pWzFg_xKgw.jpeg"/,
  );

  expect(lambdaPostContent).toContain(
    '<Gist id="249a0a34735f3320187758b77a4af309" />',
  );

  expect(reactGirlsPostContent).toContain(
    '<YouTube videoId="https://www.youtube.com/embed/jxZoasJQl-w?feature=oembed" />',
  );

  // images
  const assets = await testEnvironment.getAssets();
  expect(assets.items).toHaveLength(2);
  const lambdaImage = assets.items.find((item) => {
    return (
      item.fields.title['en-US'] ===
      'reduce-bloat-of-your-lambdas__1*p_IgJZXI_556pWzFg_xKgw.jpeg'
    );
  });

  expect(lambdaImage.isPublished()).toBe(true);
});

test('sync with partially new posts', async () => {
  nockFeed('1st-2nd');

  await handler({}, { spaceId: testSpace.sys.id });

  const posts = await testEnvironment.getEntries({
    limit: 10,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
  });

  expect(posts.items).toHaveLength(3);
  // existing post not republished
  const lambdaPost = posts.items.find(
    (post) => post.fields.slug['en-US'] === 'reduce-bloat-of-your-lambdas',
  );
  expect(lambdaPost).toHaveProperty('sys.publishedCounter', 0);
  // new post
  const mergerPost = posts.items.find(
    (post) =>
      post.fields.slug['en-US'] === 'yld-announces-a-merger-with-make-us-proud',
  );
  expect(mergerPost.isDraft()).toBe(true);
  expect(mergerPost.isPublished()).toBe(false);
});

test('sync with updates', async () => {
  let {
    items: [lambdaPost],
  } = await testEnvironment.getEntries({
    limit: 1,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
    'fields.slug': 'reduce-bloat-of-your-lambdas',
  });

  expect(lambdaPost.isPublished()).toBe(false);
  expect(lambdaPost.isDraft()).toBe(true);

  delete lambdaPost.fields.authorName;
  lambdaPost = await lambdaPost.update();
  expect(lambdaPost).not.toHaveProperty('fields.authorName');

  nockFeed('1st-2nd');

  await handler({}, { spaceId: testSpace.sys.id });

  ({
    items: [lambdaPost],
  } = await testEnvironment.getEntries({
    limit: 1,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
    'fields.slug': 'reduce-bloat-of-your-lambdas',
  }));

  expect(lambdaPost).toHaveProperty('fields.authorName');
  expect(lambdaPost.isPublished()).toBe(true);
  expect(lambdaPost).toHaveProperty('sys.publishedCounter', 1);
});
