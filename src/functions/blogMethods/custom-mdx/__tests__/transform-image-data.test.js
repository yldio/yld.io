jest.mock('../../../utils/is-prod', () => true);

const mockUploadToContentful = jest.fn(({ name }) => {
  return {
    url: `https://cdn.example.com/${name}`,
    id: 'assetId',
  };
});

jest.mock('../upload-image-to-contentful', () => mockUploadToContentful);

beforeEach(() => {
  mockUploadToContentful.mockClear();
});

const TransformImageData = require('../transform-image-data');

const img1 = {
  caption: 'Image 1 caption',
  name: 'the_name_of_the_first_image.jpg',
  ext: '.jpg',
  src: 'https://external.source.com/1',
};
const img2 = {
  alt: 'Image 2 caption',
  name: 'the_name_of_the_second_image',
  ext: '.jpg',
  src: 'https://external.source.com/2',
};
const post = {
  title: 'Blog Title',
  content: `
    <image:the_name_of_the_first_image.jpg>
    <image:the_name_of_the_second_image>
  `,
  images: [img1, img2],
};
const environment = {};

it('uploads the images', async () => {
  await TransformImageData(post, environment);

  expect(mockUploadToContentful).toHaveBeenCalledWith(
    img1,
    'Blog Title',
    environment,
  );
  expect(mockUploadToContentful).toHaveBeenCalledWith(
    img2,
    'Blog Title',
    environment,
  );
});

it('transforms image placeholders to FigureImage components', async () => {
  const expected = `
    <FigureImage src="https://cdn.example.com/the_name_of_the_first_image.jpg" caption="Image 1 caption" />
    <FigureImage src="https://cdn.example.com/the_name_of_the_second_image" alt="Image 2 caption" />
  `;

  const { content } = await TransformImageData(post, environment);

  expect(content).toBe(expected);
});

it('generates relatedMedia links', async () => {
  const expected = [
    {
      sys: {
        id: 'assetId',
        linkType: 'Asset',
        type: 'Link',
      },
    },
    {
      sys: {
        id: 'assetId',
        linkType: 'Asset',
        type: 'Link',
      },
    },
  ];

  const { relatedMedia } = await TransformImageData(post, environment);

  expect(relatedMedia).toStrictEqual(expected);
});
