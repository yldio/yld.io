const AddFrontMatter = require('../../../../src/functions/blogMethods/add-frontmatter')

const post = {
  title: 'Blog Title',
  slug: 'blog-slug',
  md: `# Blog Title\n\nA bit of content`,
  tags: ['tag1', 'tag2'],
  firstPublishedAt: '2019-01-01',
  authorName: 'Rick Sanchez'
}

it('prepends the front matter to the md', () => {
  const frontmatter = `---
title: Blog Title
slug: blog-slug
tags: tag1,tag2
firstPublishedAt: 2019-01-01
author: Rick Sanchez
root: '/blog'
---`
  expect(AddFrontMatter(post)).toStartWith(frontmatter)
})

it('retains the original md', () => {
  expect(AddFrontMatter(post)).toContain(post.md)
})
