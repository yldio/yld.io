/**
 * When Gatsby builds, Mdx tries to render <React.Suspense/> as a component
 * instead of just string. Here we just need to wrap in `` to get Mdx to ignore
 * trying to render this component...
 */

const toReplace = [
  ['<React.Suspense />', '`<React.Suspense />`'],
  ['<React.Suspense/>', '`<React.Suspense/>`'],
  ['<React.Fragment />', '`<React.Fragment />`'],
  ['<React.Fragment/>', '`<React.Fragment/>`'],
  ['https://medium.com/yld-blog/', 'https://yld.io/blog/'],
  ['https://medium.com/yld-engineering-blog/', 'https://yld.io/blog/']
]

module.exports = post => ({
  ...post,
  md: toReplace.reduce(
    (acc, [str, replace]) => acc.replace(new RegExp(str, 'gm'), replace),
    post.md
  )
})
