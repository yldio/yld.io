const UploadImageToContentful = require('../upload-image-to-contentful');

const mockPublish = jest.fn(function publish() {
  return {
    ...this,
    fields: {
      ...this.fields,
      file: {
        ...this.fields.file,
        'en-US': {
          ...this.fields.file['en-US'],
          url: 'https://cdn.example.com/uploaded.jpg',
        },
      },
    },
  };
});
const mockProcessForAllLocales = jest.fn(function processForAllLocales() {
  return {
    ...this,
    publish: mockPublish,
  };
});
const mockCreateAsset = jest.fn(({ fields }) => ({
  fields,
  sys: { id: '42' },
  processForAllLocales: mockProcessForAllLocales,
}));

const environment = {
  createAsset: mockCreateAsset,
};

const image = {
  caption: 'A lovely caption',
  name: 'image_name',
  ext: '.jpg',
  src: 'https://source.example.com/image_name.jpg',
};
const title = 'How to';

it('creates, processes, and publishes the image', async () => {
  await UploadImageToContentful(image, title, environment);
  expect(mockPublish).toHaveBeenCalled();
});

it('generates a title including the image name', async () => {
  await UploadImageToContentful(image, title, environment);
  expect(mockPublish.mock.results[0].value).toHaveProperty('fields.title', {
    'en-US': 'how-to__image_name',
  });
});

it('passes the file name for the upload', async () => {
  await UploadImageToContentful(image, title, environment);
  expect(mockPublish.mock.results[0].value).toHaveProperty(
    'fields.file.en-US.fileName',
    'image_name',
  );
});

it('passes the upload URL', async () => {
  await UploadImageToContentful(image, title, environment);
  expect(mockPublish.mock.results[0].value).toHaveProperty(
    'fields.file.en-US.upload',
    'https://source.example.com/image_name.jpg',
  );
});

it('generates a mime type based on the extension', async () => {
  await UploadImageToContentful(image, title, environment);
  expect(mockPublish.mock.results[0].value).toHaveProperty(
    'fields.file.en-US.contentType',
    'image/jpeg',
  );
});

it('returns the image url', async () => {
  const { url } = await UploadImageToContentful(image, title, environment);
  expect(url).toBe('https://cdn.example.com/uploaded.jpg');
});

it('returns the id', async () => {
  const { id } = await UploadImageToContentful(image, title, environment);
  expect(id).toBe('42');
});
