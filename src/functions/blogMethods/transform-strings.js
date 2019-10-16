const toReplace = [
  ['https://medium.com/yld-blog/', 'https://yld.io/blog/'],
  ['https://medium.com/yld-blog', 'https://yld.io/blog/'],
  ['https://medium.com/yld-engineering-blog/', 'https://yld.io/blog/'],
  ['https://medium.com/yld-engineering-blog', 'https://yld.io/blog/']
]

module.exports = post => ({
  ...post,
  md: toReplace.reduce(
    (acc, [str, replace]) => acc.replace(new RegExp(str, 'gm'), replace),
    post.md
  )
})
