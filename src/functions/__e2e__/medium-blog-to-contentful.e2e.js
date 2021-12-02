jest.setTimeout(120000);

jest.mock('../utils/auth');
jest.mock('../utils/is-prod', () => true);
const mockEnvironmentName = `e2e-${new Date().toISOString().replace(/:/g, '')}`;
jest.mock('../utils/contentful-environment-name', () => mockEnvironmentName);

const { series: ForEach } = require('apr-for-each');
const { createClient } = require('contentful-management');
const testUtils = require('@contentful/integration-test-utils');
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

let environment;
// to skip the expensive environment creation and always use one environment when debugging:
// * use the following beforeAll hook instead of the normal one
// * comment out the afterAll hook
// * manually set the environmentName at the top
// beforeAll(async () => {
//   const space = await client.getSpace(CONTENTFUL_SPACE);
//   environment = await space.getEnvironment(mockEnvironmentName);
// });

beforeAll(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE);
  environment = await space.createEnvironmentWithId(mockEnvironmentName, {
    name: mockEnvironmentName,
  });

  await testUtils.waitForEnvironmentToBeReady(space, environment);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { items: posts } = await environment.getEntries({
      limit: 1000,
      // eslint-disable-next-line camelcase
      content_type: 'blogPost',
    });

    if (!posts.length) {
      break;
    }

    // eslint-disable-next-line no-await-in-loop
    await ForEach(posts, async (post) => {
      console.log(`Removing Post: "${post?.fields?.title?.['en-US']}"`);

      if (post?.isPublished()) {
        await post?.unpublish();
      }

      await post?.delete();
    });
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { items: assets } = await environment.getAssets({ limit: 1000 });
    if (!assets.length) {
      break;
    }

    // eslint-disable-next-line no-await-in-loop
    await ForEach(assets, async (asset) => {
      console.log(`Removing Asset: "${asset?.fields?.title?.['en-US']}"`);

      if (asset?.isPublished()) {
        // might not be published
        await asset?.unpublish();
      }

      await asset?.delete();
    });
  }
}, 2400000);

afterAll(async () => {
  await environment.delete();
});

test('initial sync', async () => {
  nockFeed('2nd-3rd');

  await handler({});

  const posts = await environment.getEntries({
    limit: 10,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
  });

  expect(posts.items).toHaveLength(2);
  const lambdaPost = posts.items.find((post) => {
    return post.fields.slug['en-US'] === 'reduce-bloat-of-your-lambdas';
  });

  expect(lambdaPost.isPublished()).toBe(true);
  // additional post to check a different embed type
  const reactGirlsPost = posts.items.find((post) => {
    return post.fields.slug['en-US'] === 'reactjs-girls-the-conference';
  });

  expect(reactGirlsPost.isPublished()).toBe(true);

  // meta
  expect(lambdaPost).toHaveProperty(
    'fields.title.en-US',
    'Reduce bloat of your Lambdas',
  );

  expect(lambdaPost).toHaveProperty('fields.authorName.en-US', 'Sérgio Ramos');
  expect(lambdaPost).toHaveProperty('fields.publish.en-US', true);

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
    '<Gist id="d160e5da9d5f7992b9df4ee12955b1a4" />',
  );

  expect(reactGirlsPostContent).toContain(
    '<YouTube videoId="https://www.youtube.com/watch?v=jxZoasJQl-w" />',
  );

  // images
  const assets = await environment.getAssets();
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

  await handler({});

  const posts = await environment.getEntries({
    limit: 10,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
  });

  expect(posts.items).toHaveLength(3);
  // existing post not republished
  const lambdaPost = posts.items.find(
    (post) => post.fields.slug['en-US'] === 'reduce-bloat-of-your-lambdas',
  );
  expect(lambdaPost).toHaveProperty('sys.publishedCounter', 1);
  // new post
  const mergerPost = posts.items.find(
    (post) =>
      post.fields.slug['en-US'] === 'yld-announces-a-merger-with-make-us-proud',
  );
  expect(mergerPost.isPublished()).toBe(true);
});

test('sync with updates', async () => {
  let {
    items: [lambdaPost],
  } = await environment.getEntries({
    limit: 1,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
    'fields.slug': 'reduce-bloat-of-your-lambdas',
  });

  delete lambdaPost.fields.authorName;
  lambdaPost = await lambdaPost.update();
  expect(lambdaPost).not.toHaveProperty('fields.authorName');

  nockFeed('1st-2nd');

  await handler({});

  ({
    items: [lambdaPost],
  } = await environment.getEntries({
    limit: 1,
    // eslint-disable-next-line camelcase
    content_type: 'blogPost',
    'fields.slug': 'reduce-bloat-of-your-lambdas',
  }));

  expect(lambdaPost).toHaveProperty('fields.authorName');
  expect(lambdaPost.isPublished()).toBe(true);
  expect(lambdaPost).toHaveProperty('sys.publishedCounter', 2);
});
