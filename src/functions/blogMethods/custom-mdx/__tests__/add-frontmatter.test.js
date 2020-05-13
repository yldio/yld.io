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
  const frontmatter = `---
title: Blog Title
slug: blog-slug
tags: tag1,tag2
firstPublishedAt: 2019-01-01
author: Rick Sanchez
root: /blog
---`;
  expect(AddFrontMatter(post)).toStartWith(frontmatter);
});

it('escapes strings when they include special characters', () => {
  const frontmatter = `---
title: \"Test: 1\"
slug: blog-slug
tags: tag1,tag2
firstPublishedAt: 2019-01-01
author: Rick Sanchez
root: /blog
---`;
  expect(AddFrontMatter({ ...post, title: 'Test: 1' })).toStartWith(
    frontmatter,
  );
});

it('retains the original content', () => {
  expect(AddFrontMatter(post)).toContain(post.content);
});
