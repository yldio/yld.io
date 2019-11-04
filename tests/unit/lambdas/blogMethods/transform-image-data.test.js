jest.mock('../../../../src/functions/utils/is-prod', () => true)

const mockUploadToContentful = jest.fn(({ caption, name }) => {
  return {
    url: `https://images.host.com/${name}`,
    caption,
    alt: 'caption',
    fileName: name,
    assetId: 'assetId'
  }
})

jest.mock(
  '../../../../src/functions/blogMethods/upload-image-to-contentful.js',
  () => mockUploadToContentful
)

const TransformImageData = require('../../../../src/functions/blogMethods/transform-image-data')

describe('TransformImageData', () => {
  it('should transform the image data correctly', async () => {
    const post = {
      title: 'Blog Title',
      md: `# Blog Title\n<image:the_name_of_the_first_image>\n<image:the_name_of_the_second_image>`,
      images: [
        {
          caption: 'Image 1 caption',
          name: 'the_name_of_the_first_image',
          ext: '.jpg',
          src: 'https://external.source.com/1'
        },
        {
          caption: 'Image 2 caption',
          name: 'the_name_of_the_second_image',
          ext: '.jpg',
          src: 'https://external.source.com/2'
        }
      ]
    }

    const expected = {
      ...post,
      md: `# Blog Title\n<FigureImage src="https://images.host.com/the_name_of_the_first_image" caption="Image 1 caption" alt="caption" />\n<FigureImage src="https://images.host.com/the_name_of_the_second_image" caption="Image 2 caption" alt="caption" />`,
      relatedMedia: [
        {
          sys: {
            id: 'assetId',
            linkType: 'Asset',
            type: 'Link'
          }
        },
        {
          sys: {
            id: 'assetId',
            linkType: 'Asset',
            type: 'Link'
          }
        }
      ]
    }

    const result = await TransformImageData(post)

    expect(result).toEqual(expected)
  })
})
