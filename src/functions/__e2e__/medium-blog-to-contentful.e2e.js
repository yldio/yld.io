jest.setTimeout(60000);

jest.mock('../utils/auth');
jest.mock('../utils/is-prod', () => true);
const mockEnvironmentName = `e2e-${new Date().toISOString().replace(/:/g, '')}`;
// const mockEnvironmentName = 'e2e-2020-01-01T000000.000Z';
jest.mock('../utils/contentful-environment-name', () => mockEnvironmentName);

const { createClient } = require('contentful-management');
const { readFileSync } = require('fs');
const nock = require('nock');
const { resolve } = require('path');
const throat = require('throat');

const mediaRedirects = require('../__fixtures__/medium-media-redirects');
const {
  handler: MediumBlogToContentful,
} = require('../medium-blog-to-contentful');

// Medium nock
const mediaPathRegex = /\/media\/([0-9a-f]{32})\/href/;
beforeEach(() => {
  nock('https://medium.com')
    .get('/feed/yld-blog')
    .reply(
      200,
      readFileSync(resolve(__dirname, '../__fixtures__/medium-feed.xml')),
      { 'content-type': 'text/xml; charset=UTF-8' },
    )
    .get(mediaPathRegex)
    .times(Object.keys(mediaRedirects).length)
    .reply(uri => {
      const [, id] = mediaPathRegex.exec(uri);
      const location = mediaRedirects[id];
      return location ? [302, null, { location }] : [404];
    });
});
afterAll(() => {
  nock.cleanAll();
});

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
//
//   environment = await space.getEnvironment(mockEnvironmentName);
// });

beforeAll(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE);

  environment = await space.createEnvironmentWithId(mockEnvironmentName, {
    name: mockEnvironmentName,
  });
  while (environment.sys.status.sys.id !== 'ready') {
    environment = await space.getEnvironment(environment.sys.id);
  }

  while (true) {
    const posts = await environment.getEntries({
      limit: 1000,
      content_type: 'blogPost',
    });
    if (!posts.items.length) break;
    await Promise.all(
      posts.items.map(
        /* eslint-disable-next-line no-unused-vars */
        throat(32, async post => {
          try {
            // might not be published
            post = await post.unpublish();
          } catch {} /* eslint-disable-line no-empty */
          post = await post.delete();
        }),
      ),
    );
  }

  while (true) {
    const assets = await environment.getAssets({ limit: 1000 });
    if (!assets.items.length) break;
    await Promise.all(
      assets.items.map(
        /* eslint-disable-next-line no-unused-vars */
        throat(32, async asset => {
          try {
            // might not be published
            asset = await asset.unpublish();
          } catch {} /* eslint-disable-line no-empty */
          asset = await asset.delete();
        }),
      ),
    );
  }
}, 300000);
afterAll(async () => {
  await environment.delete();
});

test('initial sync', async () => {
  await MediumBlogToContentful({});
  const posts = await environment.getEntries({
    limit: 10,
    content_type: 'blogPost',
  });
  expect(posts.items).toHaveLength(2);
  const lambdaPost = posts.items.find(
    post => post.fields.slug['en-US'] === 'reduce-bloat-of-your-lambdas',
  );
  expect(lambdaPost).not.toBe(undefined);
  const reactGirlsPost = posts.items.find(
    post => post.fields.slug['en-US'] === 'reactjs-girls-the-conference',
  );
  expect(reactGirlsPost).not.toBe(undefined);

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
});
// TODO sync with no changes, sync with further posts, sync with updates
