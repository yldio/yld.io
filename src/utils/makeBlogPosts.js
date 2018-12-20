export default (posts, title) => {
  const removeJS = title
    .split('.js')[0]
    .toLowerCase()
    .trim()
  const removeDots = title
    .replace('.', '')
    .toLowerCase()
    .trim()
  return posts
    .map(p => ({
      ...p.node,
      tags: p.node.virtuals.tags.map(a => a.slug)
    }))
    .filter(t => {
      if (t.tags.includes(removeDots)) {
        return true
      }
      if (t.tags.includes(removeJS)) {
        return true
      }

      return false
    })
}
