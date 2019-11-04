const PublishToContentful = require('../../../../src/functions/blogMethods/publish-to-contentful')

const createEntryMock = jest.fn()
const publishMock = jest.fn()
const updateMock = jest.fn()

const getEntryMock = jest.fn().mockResolvedValue({
  publish: publishMock,
  update: updateMock
})

const environment = {
  createEntry: createEntryMock,
  getEntry: getEntryMock
}

const locale = 'en-US'

const generateContentfulData = (posts, fields) =>
  posts.map(post => ({
    fields: fields.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          [locale]: post[curr]
        }
      }),
      {}
    )
  }))

describe('PublishToContentful', () => {
  it('calls the contentful API methods correctly with the correct data', async () => {
    const postTitleIDMap = {
      'Blog Title #1': 'this_is_a_contentful_id'
    }

    const posts = [
      {
        title: 'Blog Title #1',
        firstPublishedAt: '2019-10-10',
        headerImage: {
          sys: {
            type: 'Link',
            id: 'asset_id_1'
          }
        },
        slug: 'blog-slug-1',
        tags: ['tag1', 'tag2'],
        authorName: 'Big time author',
        content: '# Blog title\nthis is markdown!',
        relatedMedia: [
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '123'
            }
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '321'
            }
          }
        ]
      },
      {
        title: 'Blog Title #2',
        firstPublishedAt: '2019-10-11',
        headerImage: {
          sys: {
            type: 'Link',
            id: 'asset_id_2'
          }
        },
        slug: 'blog-slug-2',
        tags: ['tag1', 'tag2'],
        authorName: 'Big time author',
        content: '# Blog title\nthis is markdown!'
      }
    ]

    createEntryMock.mockResolvedValue({
      sys: {
        id: 'id'
      }
    })

    const updatePublishMock = jest.fn().mockResolvedValueOnce({})

    updateMock.mockResolvedValueOnce({
      publish: updatePublishMock
    })

    const allFields = [
      'title',
      'firstPublishedAt',
      'headerImage',
      'slug',
      'tags',
      'authorName',
      'content',
      'relatedMedia'
    ]

    const createEntryData = generateContentfulData(posts, allFields)

    getEntryMock.mockResolvedValueOnce({
      update: updateMock,
      publish: updatePublishMock,
      fields: createEntryData[0]
    })

    await PublishToContentful(posts, environment, allFields, postTitleIDMap)

    // Updated post assertions
    expect(updateMock).toHaveBeenCalled()
    expect(updatePublishMock).toHaveBeenCalledTimes(1)

    // New post assertions
    expect(createEntryMock).toHaveBeenCalledWith('blogPost', createEntryData[1])
    expect(publishMock).toHaveBeenCalledTimes(1)

    expect(getEntryMock).toHaveBeenNthCalledWith(1, 'this_is_a_contentful_id')
    expect(getEntryMock).toHaveBeenNthCalledWith(2, 'id')
  })
})
