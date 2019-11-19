const TransformIframes = require('../transform-iframes');
const Got = require('got');

jest.mock('got');

beforeEach(() => {
  Got.mockReset();
});

it('ignores non-iframe content', async () => {
  expect(await TransformIframes({ content: 'Post' })).toEqual({
    content: 'Post',
  });
});

it('replaces gist links with Gist components', async () => {
  const post = {
    content: `<iframecontent:"https://medium.com/media/medium_id/href">`,
  };

  const expected = `<Gist id="gist_id" />`;

  Got.mockResolvedValueOnce({
    url: 'https://gist.github.com/tamlyn/gist_id',
  });

  const { content } = await TransformIframes(post);

  expect(Got).toHaveBeenCalledWith('https://medium.com/media/medium_id/href');
  expect(content).toBe(expected);
});

it('replaces instagram links with Instagram components', async () => {
  const post = {
    content: `<iframecontent:"https://medium.com/media/medium_id/href">`,
  };

  const expected = `<Instagram postId="https://www.instagram.com/p/insta_id/?taken-by=insta_user" />`;

  Got.mockResolvedValueOnce({
    url: 'https://www.instagram.com/p/insta_id/?taken-by=insta_user',
  });

  const { content } = await TransformIframes(post);

  expect(Got).toHaveBeenCalledWith('https://medium.com/media/medium_id/href');
  expect(content).toBe(expected);
});

it('replaces youtube links with YouTube components', async () => {
  const post = {
    content: `<iframecontent:"https://medium.com/media/medium_id/href">`,
  };

  const expected = `<YouTube videoId="https://www.youtube.com/watch?v=youtube_video_id" />`;

  Got.mockResolvedValueOnce({
    url: 'https://www.youtube.com/watch?v=youtube_video_id',
  });

  const { content } = await TransformIframes(post);

  expect(Got).toHaveBeenCalledWith('https://medium.com/media/medium_id/href');
  expect(content).toBe(expected);
});

it('replaces iframe links with iframe tags', async () => {
  const post = {
    content: `<iframecontent:"https://medium.com/media/medium_id/href">`,
  };

  const expected = `<iframe src="https://example.iframe.com/" />`;

  Got.mockResolvedValueOnce({
    url: 'https://example.iframe.com/',
  });

  const { content } = await TransformIframes(post);

  expect(Got).toHaveBeenCalledWith('https://medium.com/media/medium_id/href');
  expect(content).toBe(expected);
});
