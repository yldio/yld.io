const TranspileAllPosts = require('../../../../src/functions/blogMethods/transpile-all-posts')

describe('TranspileAllPosts', () => {
  it('should return the posts when there are no transpiling errors', async () => {
    const posts = [
      {
        slug: 'slug-of-the-first-post',
        md:
          '# Blog title\nThis is a paragraph with a react component in it: `<React.Suspense/>`'
      },
      {
        slug: 'slug-of-the-second-post',
        md:
          '# Blog title\nThis is a paragraph with a react component in it: `<React.Fragment/>`'
      }
    ]
    const result = await TranspileAllPosts(posts)

    expect(result).toEqual(posts)
  })

  it('should throw an error when there are transpiling errors', async () => {
    const posts = [
      {
        slug: 'slug-of-the-first-post',
        md: '# Blog title\n <UnterminatedComponent'
      }
    ]

    await expect(TranspileAllPosts(posts)).rejects.toThrow()
  })
})
