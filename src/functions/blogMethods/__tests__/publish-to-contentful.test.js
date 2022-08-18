const PublishToContentful = require('../publish-to-contentful');

const originalConsoleInfo = console.info;
beforeEach(() => {
  console.info = jest.fn();
});
afterEach(() => {
  console.info = originalConsoleInfo;
});

const createEntryMock = jest.fn();
const getEntryMock = jest.fn();

const environment = {
  createEntry: createEntryMock,
  getEntry: getEntryMock,
};

const publishMock = jest
  .fn()
  .mockImplementation(async (asset) => ({ ...asset }));

beforeEach(() => {
  createEntryMock.mockReset();
  getEntryMock.mockReset();
});

describe('given a post that is not in the CMS yet', () => {
  it('publishes a new entry', async () => {
    createEntryMock.mockImplementation(async (_type, fields) => ({
      fields,
      publish: publishMock,
    }));

    await PublishToContentful(
      [
        {
          slug: 'post',
          title: 'Post',
        },
      ],
      environment,
      ['slug', 'title'],
      [],
    );

    expect(createEntryMock).toHaveBeenCalledWith('blogPost', {
      fields: {
        publish: { 'en-US': true },
        slug: { 'en-US': 'post' },
        title: { 'en-US': 'Post' },
      },
    });
    expect(publishMock).not.toHaveBeenCalled();

    expect(console.info).toHaveBeenCalledWith(
      expect.stringMatching(/Creating.+Post/),
    );
  });
});
