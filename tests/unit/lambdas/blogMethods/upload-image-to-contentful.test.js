const UploadImageToContentful = require('../../../../src/functions/blogMethods/upload-image-to-contentful')

const mockPublish = jest.fn()
const mockGetAsset = jest.fn(() => ({
  publish: mockPublish
}))
const mockProcessLocales = jest.fn()

const mockCreateAsset = jest.fn(() => ({
  processForAllLocales: mockProcessLocales
}))

const environment = {
  createAsset: mockCreateAsset,
  getAsset: mockGetAsset
}

describe('UploadImageToContentful', () => {
  it('should upload correctly', async () => {
    const image = {
      caption: 'A lovely caption',
      name: 'image_name_1',
      ext: '.jpg',
      src: 'https://image.source.com/image_name_1'
    }

    const title = 'How to Write the best jquery functions'
    const kebabTitle = 'how-to-write-the-best-jquery-functions'
    const imageName = `${kebabTitle}__${image.name}`

    mockProcessLocales.mockResolvedValueOnce({
      fields: {
        title: {
          'en-US': imageName
        },
        file: {
          'en-US': {
            fileName: imageName,
            url: `https://image.uploaded.com/${imageName}`
          }
        }
      },
      sys: {
        id: 'new_asset_id'
      }
    })

    const result = await UploadImageToContentful(image, title, environment)
    const expected = {
      assetId: 'new_asset_id',
      fileName: imageName,
      title: 'how-to-write-the-best-jquery-functions__image_name_1',
      url:
        'https://image.uploaded.com/how-to-write-the-best-jquery-functions__image_name_1'
    }

    expect(result).toEqual(expected)

    expect(mockProcessLocales).toHaveBeenCalledTimes(1)
    expect(mockGetAsset).toHaveBeenCalledWith('new_asset_id')
    expect(mockPublish).toHaveBeenCalledTimes(1)
    expect(mockCreateAsset).toHaveBeenCalledWith({
      fields: {
        title: {
          'en-US': imageName
        },
        file: {
          'en-US': {
            contentType: `image/jpg`,
            fileName: image.name,
            upload: image.src
          }
        }
      }
    })
  })
})
