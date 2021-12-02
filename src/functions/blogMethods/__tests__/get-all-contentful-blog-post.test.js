const GetAllContentfulBlogPosts = require('../get-all-contentful-blog-posts');

const posts = [...Array(2 ** 16).keys()].map((i) => ({ slug: `post-${i}` }));

const mockGetEntries = jest.fn(({ skip, limit }) => ({
  skip,
  limit,
  total: posts.length,
  items: posts.slice(skip, skip + limit),
}));
const environment = { getEntries: mockGetEntries };

beforeEach(() => {
  mockGetEntries.mockClear();
});

it('requests blog posts', async () => {
  await GetAllContentfulBlogPosts(environment);
  mockGetEntries.mock.calls.forEach(([{ content_type }]) => {
    expect(content_type).toBe('blogPost');
  });
});

it('requests until it has all entries and returns them', async () => {
  expect(await GetAllContentfulBlogPosts(environment)).toEqual(posts);
});

it('does not exceed the contentful entry limit', async () => {
  await GetAllContentfulBlogPosts(environment);
  mockGetEntries.mock.calls.forEach(([{ limit }]) => {
    expect(limit).toBeLessThanOrEqual(1000);
  });
});
