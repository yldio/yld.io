const TransformCustomMdx = require('..');
const TransformImageData = require('../transform-image-data');

jest.mock('../add-frontmatter');
jest.mock('../transform-iframes');
jest.mock('../transform-image-data');
jest.mock('../transform-strings');

const post = {
  slug: 'Post',
  content: 'Bla',
};
const environment = {};

it('transforms each post', async () => {
  expect(await TransformCustomMdx([post, post], environment)).toHaveLength(2);
});

it('adds the frontmatter', async () => {
  expect((await TransformCustomMdx([post], environment))[0].content).toContain(
    'frontmatter',
  );
});

it('transforms iframes', async () => {
  expect((await TransformCustomMdx([post], environment))[0].content).toContain(
    'iframe embeds',
  );
});

it('transforms image data', async () => {
  const { content, relatedMedia } = (
    await TransformCustomMdx([post], environment)
  )[0];
  expect(content).toContain('images');
  expect(Array.isArray(relatedMedia)).toBe(true);
  expect(TransformImageData).toHaveBeenCalledWith(
    expect.any(Object),
    environment,
  );
});

it('transforms strings', async () => {
  expect((await TransformCustomMdx([post], environment))[0].content).toContain(
    'transformed strings',
  );
});
