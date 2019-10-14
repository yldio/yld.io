const TransformIframes = require('../../../../src/functions/blogMethods/transform-iframes')
jest.mock('got')
const Got = require('got')

describe('TransformIframes', () => {
  it('calls the contentful API methods correctly with the correct data', async () => {
    const post = {
      title: 'Blog Title',
      md: `# Blog title\nSome more content to read!\n<iframecontent:"https://medium.com/media/f36dfcb77957d7ac9016e76a0abf4da1/href">\n<iframecontent:"https://medium.com/media/f36dfcb77957d7ac9016e76a0abf4da1/href">\n<iframecontent:"https://medium.com/media/f36dfcb77957d7ac9016e76a0abf4da1/href">\n`
    }

    const expected = {
      title: 'Blog Title',
      md: `# Blog title\nSome more content to read!\n<Gist id="a0885e9223faaaa1b031de0b0862f4c9" />\n<YouTube videoId="youtube_video_id" />\n<iframe src="https://example.iframe.com" />\n`
    }

    Got.mockResolvedValueOnce({
      url: 'https://gist.github.com/tamlyn/a0885e9223faaaa1b031de0b0862f4c9'
    })

    Got.mockResolvedValueOnce({
      url: 'https://www.youtube.com/watch?v=youtube_video_id'
    })

    Got.mockResolvedValueOnce({
      url: 'https://example.iframe.com'
    })

    const result = await TransformIframes(post)

    expect(result).toEqual(expected)
  })
})
