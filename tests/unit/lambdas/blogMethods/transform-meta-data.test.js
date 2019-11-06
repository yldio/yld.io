const TransformMetaData = require('../../../../src/functions/blogMethods/transform-meta-data')

const headerImage = {
  sys: {
    type: 'Link',
    linkType: 'Asset',
    id: 'asset_id_1'
  }
}
const post = {
  title: 'Blog Title',
  relatedMedia: [
    headerImage,
    {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: 'asset_id_2'
      }
    }
  ]
}

it('transforms each post', () => {
  expect(TransformMetaData([post, post])).toHaveLength(2)
})

it('adds the first relatedMedia as the headerImage', () => {
  const [{ headerImage: actual }] = TransformMetaData([post])

  expect(actual).toEqual(headerImage)
})

it('defaults to undefined if there is no relatedMedia', () => {
  const [{ headerImage: actual }] = TransformMetaData([
    { ...post, relatedMedia: [] }
  ])

  expect(actual).toBe(undefined)
})
