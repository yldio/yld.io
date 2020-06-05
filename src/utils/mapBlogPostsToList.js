import replaceAccentChars from './replaceAccentChars';

export default function mapBlogPostsToList(searchTerm, posts) {
  const reg = new RegExp(replaceAccentChars(searchTerm), 'ig');

  return posts
    .filter(
      ({ node: { title, authorName } }) =>
        reg.test(replaceAccentChars(title)) ||
        reg.test(replaceAccentChars(authorName)),
    )
    .map(({ node: { title, slug } }) => ({ slug: `/blog/${slug}`, title }));
}
