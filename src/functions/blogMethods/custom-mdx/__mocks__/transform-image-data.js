module.exports = jest.fn(async ({ content, ...post }) => ({
  ...post,
  content: `${content}\nimages`,
  relatedMedia: [],
}));
