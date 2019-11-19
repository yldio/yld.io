const Got = require('got');

const gistBuilder = id => `<Gist id="${id}" />`;
const instagramPostBuilder = url => `<Instagram postId="${url}" />`;
const youtubeVideoBuilder = url => `<YouTube videoId="${url}" />`;
const genericIframeBuilder = link => `<iframe src="${link}" />`;

const findOccurrences = str => {
  const regex = /<iframecontent:"(\S*)">/gi;
  let result = [];
  const occurrences = [];

  while ((result = regex.exec(str))) {
    const [chunk, url] = result;

    occurrences.push({
      chunk,
      url,
    });
  }

  return occurrences;
};

const getIframeContent = async url => {
  const forwardedUrl = new URL((await Got(url)).url);

  switch (forwardedUrl.host) {
    case 'gist.github.com': {
      const [, , gistId] = forwardedUrl.pathname.split('/');

      return {
        type: 'gist',
        id: gistId,
      };
    }

    case 'instagr.am':
    case 'instagram.com':
    case 'www.instagram.com': {
      return {
        type: 'instagram',
        id: String(forwardedUrl),
      };
    }

    case 'youtube.com':
    case 'www.youtube.com':
      return {
        type: 'youtube',
        id: String(forwardedUrl),
      };

    default:
      return {
        type: 'unknown',
        link: forwardedUrl,
      };
  }
};

const transformIframes = async post => {
  const { content } = post;

  let processedMarkdown = content;

  const occurrences = findOccurrences(content);

  if (occurrences.length > 0) {
    await Promise.all(
      occurrences.map(async ({ chunk, url }) => {
        const { type, id, link } = await getIframeContent(url);

        switch (type) {
          case 'gist':
            processedMarkdown = processedMarkdown.replace(
              chunk,
              gistBuilder(id),
            );
            break;
          case 'instagram':
            processedMarkdown = processedMarkdown.replace(
              chunk,
              instagramPostBuilder(id),
            );
            break;
          case 'youtube':
            processedMarkdown = processedMarkdown.replace(
              chunk,
              youtubeVideoBuilder(id),
            );
            break;
          default:
            processedMarkdown = processedMarkdown.replace(
              chunk,
              genericIframeBuilder(link),
            );
        }
      }),
    );
  }

  return {
    ...post,
    content: processedMarkdown,
  };
};

module.exports = transformIframes;
