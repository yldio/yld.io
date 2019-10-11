module.exports = post => {
  const { title, slug, md, tags, firstPublishedAt, authorName } = post

  const fTitle = `title: "${title}"`
  const fSlug = `slug: ${slug}`
  const fTags = `tags: ${tags}`
  const fDate = `firstPublishedAt: ${firstPublishedAt}`
  const fAuthor = `author: ${authorName}`

  const frontmatter = `---\n${fTitle}\n${fSlug}\n${fTags}\n${fDate}\n${fAuthor}\nroot: '/blog'\n---\n`

  return {
    ...post,
    md: `${frontmatter}\n${md}`
  }
}
