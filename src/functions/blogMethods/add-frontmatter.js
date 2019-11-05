const addFrontmatter = ({
  title,
  slug,
  md,
  tags,
  firstPublishedAt,
  authorName
}) => `---
title: ${title}
slug: ${slug}
tags: ${tags}
firstPublishedAt: ${firstPublishedAt}
author: ${authorName}
root: '/blog'
---
${md}
`

module.exports = addFrontmatter
