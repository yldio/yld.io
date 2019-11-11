const TransformCustomMdx = require('../../../../../src/functions/blogMethods/custom-mdx');
const TransformImageData = require('../../../../../src/functions/blogMethods/custom-mdx/transform-image-data');

jest.mock(
  '../../../../../src/functions/blogMethods/custom-mdx/add-frontmatter',
);
jest.mock(
  '../../../../../src/functions/blogMethods/custom-mdx/transform-iframes',
);
jest.mock(
  '../../../../../src/functions/blogMethods/custom-mdx/transform-image-data',
);
jest.mock(
  '../../../../../src/functions/blogMethods/custom-mdx/transform-strings',
);

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
  const { content, relatedMedia } = (await TransformCustomMdx(
    [post],
    environment,
  ))[0];
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
