const PublishToContentful = require('../../../../src/functions/blogMethods/publish-to-contentful')

// eslint-disable-next-line no-unused-vars
const contentful = require('contentful-management')

const createEntryMock = jest.fn()
const publishMock = jest.fn()

const getEntryMock = jest.fn().mockResolvedValue({
  publish: publishMock
})

const environment = {
  createEntry: createEntryMock,
  getEntry: getEntryMock
}

const locale = 'en-US'

const generateContentfulData = posts =>
  posts.map(post => ({
    fields: Object.keys(post).reduce(
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
        content: '# Blog title\nthis is markdown!'
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

    publishMock.mockResolvedValue({
      sys: '12'
    })

    const createEntryData = generateContentfulData(posts)

    await PublishToContentful(posts, environment)

    expect(createEntryMock).toHaveBeenCalledWith('blogPost', createEntryData[0])
    expect(createEntryMock).toHaveBeenCalledWith('blogPost', createEntryData[1])
    expect(getEntryMock).toHaveBeenNthCalledWith(2, 'id')
    expect(publishMock).toHaveBeenCalledTimes(2)
  })
})
