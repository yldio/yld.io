const YAML = require('yaml');

const addFrontmatter = ({
  title,
  slug,
  content,
  tags,
  firstPublishedAt,
  authorName,
}) => `---
${YAML.stringify({
  title,
  slug,
  tags: tags.join(','),
  firstPublishedAt,
  author: authorName,
  root: '/blog',
})}---
${content}
`;

module.exports = addFrontmatter;
