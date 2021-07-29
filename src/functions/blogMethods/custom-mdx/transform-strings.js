const assert = require('assert');

const origin = /https?:\/\/medium\.com/;

const blogPath = /\/yld(-engineering)?-blog/;

const slug = /(?<slug>[^)]+)/;
const hexUid = /[0-9a-f]{8,}/;
const postPathSegment = new RegExp(`(${slug.source}-${hexUid.source})?`);

const path = new RegExp(`${blogPath.source}(\\/${postPathSegment.source})?`);

const mdLink = new RegExp(`\\(${origin.source}${path.source}\\)`, 'gi');
const mdLinkFull =
  /\(https?:\/\/medium\.com\/yld(-engineering)?-blog(\/((?<slug>[^)]+)-[0-9a-f]{8,})?)?\)/gi;
// composite mdLink and mdLinkFull are provided because one may find either more legible - this ensures they are kept in sync
assert.deepStrictEqual(mdLink, mdLinkFull);

const transformStrings = (content) =>
  content.replace(mdLink, function () {
    // eslint-disable-next-line prefer-rest-params
    const { slug = '' } = arguments[arguments.length - 1];
    return `(https://www.yld.io/blog/${slug})`;
  });

module.exports = transformStrings;
