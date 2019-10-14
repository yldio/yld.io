const TransformStrings = require('../../../../src/functions/blogMethods/transform-strings')

describe('TransformStrings', () => {
  it('should transform strings correctly', () => {
    const post = {
      title: 'Blog Title',
      md:
        '[YLD Blog](https://medium.com/yld-blog/)\n[YLD Blog](https://medium.com/yld-engineering-blog/)\n[YLD Blog](https://medium.com/yld-blog)\n[YLD Blog](https://medium.com/yld-engineering-blog)'
    }

    const expected = {
      ...post,
      md:
        '[YLD Blog](https://yld.io/blog/)\n[YLD Blog](https://yld.io/blog/)\n[YLD Blog](https://yld.io/blog/)\n[YLD Blog](https://yld.io/blog/)'
    }

    const result = TransformStrings(post)
    expect(result).toEqual(expected)
  })
})
