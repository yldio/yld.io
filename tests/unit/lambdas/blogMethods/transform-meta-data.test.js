const TransformMetaData = require('../../../../src/functions/blogMethods/transform-meta-data')

describe('TransformMetaData', () => {
  it('should transform meta data correctly', async () => {
    const posts = [
      {
        title: 'Blog Title',
        relatedMedia: [
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'asset_id_1'
            }
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'asset_id_2'
            }
          }
        ]
      }
    ]
    const result = await TransformMetaData(posts)

    const expected = [
      {
        title: 'Blog Title',
        headerImage: {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: 'asset_id_1'
          }
        },
        relatedMedia: [
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'asset_id_1'
            }
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'asset_id_2'
            }
          }
        ]
      }
    ]
    expect(result).toEqual(expected)
  })
})
