/* eslint-disable no-console */
const PublishToContentful = require('../publish-to-contentful');
const until = require('async-wait-until');

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

const publishMock = jest.fn().mockImplementation(async asset => ({ ...asset }));

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

    const publishedAssets = await PublishToContentful(
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
    expect(publishMock).toHaveBeenCalled();
    expect(publishedAssets).toEqual([await publishMock.mock.results[0].value]);

    expect(console.info).toHaveBeenCalledWith(
      expect.stringMatching(/Creating.+Post/),
    );
  });
});

describe('given a post that exists in the CMS', () => {
  it('publishes the entry with updated fields', async () => {
    let resolveUpdate;
    const updateMock = jest
      .fn()
      .mockReturnValue(new Promise(resolve => (resolveUpdate = resolve)));

    const asset = {
      fields: {
        slug: { 'en-US': 'post' },
        title: { 'en-US': 'Old Post' },
      },
      update: updateMock,
    };
    const publishedAssetsPromise = PublishToContentful(
      [
        {
          slug: 'post',
          title: 'New Post',
        },
      ],
      environment,
      ['slug', 'title'],
      [asset],
    );

    await until(() => updateMock.mock.calls.length === 1);
    expect(asset.fields).toHaveProperty('title', { 'en-US': 'New Post' });
    const updatedAsset = { ...asset, publish: publishMock };
    resolveUpdate(updatedAsset);

    const publishedAssets = await publishedAssetsPromise;
    expect(publishMock).toHaveBeenCalled();
    expect(publishedAssets).toEqual([await publishMock.mock.results[0].value]);

    expect(console.info).toHaveBeenCalledWith(
      expect.stringMatching(/Updating.+New Post/),
    );
  });
});
