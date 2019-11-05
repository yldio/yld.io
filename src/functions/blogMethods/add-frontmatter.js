module.exports = post => {
  const { title, slug, md, tags, firstPublishedAt, authorName } = post

  const frontmatter = `---
title: "${title}"
slug: ${slug}
tags: ${tags}
firstPublishedAt: ${firstPublishedAt}
author: ${authorName}
root: '/blog'
---
`

  return {
    ...post,
    md: `${frontmatter}\n${md}`
  }
}
