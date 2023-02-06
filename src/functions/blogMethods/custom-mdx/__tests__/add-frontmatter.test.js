const AddFrontMatter = require('../add-frontmatter');

const post = {
  title: 'Blog Title',
  slug: 'blog-slug',
  content: `# Blog Title\n\nA bit of content`,
  tags: ['tag1', 'tag2'],
  firstPublishedAt: '2019-01-01',
  authorName: 'Rick Sanchez',
};

it('prepends the front matter to the content', () => {
  expect(AddFrontMatter(post)).toMatchInlineSnapshot(`
    "---
    title: Blog Title
    slug: blog-slug
    tags: tag1,tag2
    firstPublishedAt: 2019-01-01
    author: Rick Sanchez
    root: /blog
    ---
    # Blog Title

    A bit of content
    "
  `);
});

it('escapes strings when they include special characters', () => {
  expect(AddFrontMatter({ ...post, title: 'Test: 1' })).toMatchInlineSnapshot(`
    "---
    title: "Test: 1"
    slug: blog-slug
    tags: tag1,tag2
    firstPublishedAt: 2019-01-01
    author: Rick Sanchez
    root: /blog
    ---
    # Blog Title

    A bit of content
    "
  `);
});

it('retains the original content', () => {
  expect(AddFrontMatter(post)).toContain(post.content);
});
