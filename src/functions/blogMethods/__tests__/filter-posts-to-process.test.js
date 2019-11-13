/* eslint-disable no-console */
const FilterPostsToProcess = require('../filter-posts-to-process');

const originalConsoleInfo = console.info;
beforeEach(() => {
  console.info = jest.fn();
});
afterEach(() => {
  console.info = originalConsoleInfo;
});

const cmsBlogPosts = [{ fields: { slug: { 'en-US': 'alreadyThere' } } }];

const newPost = { slug: 'new', title: 'My New Post' };
const existingPost = { slug: 'alreadyThere', title: 'Already There' };

it('retains posts that are not in the cms', () => {
  const filtered = FilterPostsToProcess([newPost], {
    cmsBlogPosts,
    requiredFields: [],
  });
  expect(filtered).toHaveLength(1);

  expect(console.info).toHaveBeenCalledWith(
    expect.stringContaining('My New Post'),
  );
  expect(console.info).toHaveBeenCalledWith(
    expect.stringMatching(/no posts to update/i),
  );
});

it('filters out posts that are in the cms with all required fields', () => {
  const filtered = FilterPostsToProcess([existingPost], {
    cmsBlogPosts,
    requiredFields: ['slug'],
  });
  expect(filtered).toHaveLength(0);

  expect(console.info).toHaveBeenCalledWith(
    expect.stringMatching(/no new posts/i),
  );
  expect(console.info).toHaveBeenCalledWith(
    expect.stringMatching(/no posts to update/i),
  );
});

it('retains posts that are missing required fields', () => {
  const filtered = FilterPostsToProcess([existingPost], {
    cmsBlogPosts,
    requiredFields: ['slug', 'field'],
  });
  expect(filtered).toHaveLength(1);

  expect(console.info).toHaveBeenCalledWith(
    expect.stringMatching(/no new posts/i),
  );
  expect(console.info).toHaveBeenCalledWith(
    expect.stringMatching(/Already There/i),
  );
});
