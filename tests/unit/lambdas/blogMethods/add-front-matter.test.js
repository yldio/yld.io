const AddFrontMatter = require('../../../../src/functions/blogMethods/add-frontmatter')

describe('AddFrontMatter', () => {
  it('adds the front matter', () => {
    const post = {
      title: 'Blog Title',
      slug: 'blog-slug',
      md: `# Blog Title\n\nA bit of content`,
      tags: ['tag1', 'tag2'],
      firstPublishedAt: '2019-01-01',
      authorName: 'Rick Sanchez'
    }

    const expected = {
      ...post,
      md: `---\ntitle: "${post.title}"\nslug: ${post.slug}\ntags: ${
        post.tags
      }\nfirstPublishedAt: ${post.firstPublishedAt}\nauthor: ${
        post.authorName
      }\nroot: '/blog'\n---\n\n${post.md}`
    }

    const result = AddFrontMatter(post)

    expect(result).toEqual(expected)
  })

  it('adds the front matter when there are no tags', () => {
    const post = {
      title: 'Blog Title',
      slug: 'blog-slug',
      md: `# Blog Title\n\nA bit of content`,
      tags: [],
      firstPublishedAt: '2019-01-01',
      authorName: 'Rick Sanchez'
    }

    const expected = {
      ...post,
      md: `---\ntitle: "${post.title}"\nslug: ${
        post.slug
      }\ntags: \nfirstPublishedAt: ${post.firstPublishedAt}\nauthor: ${
        post.authorName
      }\nroot: '/blog'\n---\n\n${post.md}`
    }

    const result = AddFrontMatter(post)

    expect(result).toEqual(expected)
  })
})
