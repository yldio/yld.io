const addFrontmatter = ({
  title,
  slug,
  content,
  tags,
  firstPublishedAt,
  authorName,
}) => `---
title: ${title}
slug: ${slug}
tags: ${tags}
firstPublishedAt: ${firstPublishedAt}
author: ${authorName}
root: '/blog'
---
${content}
`;

module.exports = addFrontmatter;
