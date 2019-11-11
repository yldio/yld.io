/* eslint-disable no-console */

/**
 * This is a simple html to markdown converter using turndown
 * the main reason for this file is mainly so that we can use
 * it to convert the HTML from the RSS feeds but hopefully the
 * html from the medium export we have.
 *
 * We need a custom solution to be able to convert the iframes
 * the MDX element we're going to generate gist snippets with.
 */
const { URL } = require('url');
const path = require('path');

const TurndownService = require('turndown');
const turndownOptions = { codeBlockStyle: 'fenced' };

const replaceTags = content =>
  content.replace(/<([^>]*)>/g, (_, match) => '`<' + match + '>`');

/**
 * When Gatsby builds, Mdx tries to render <React.Suspense/> as a component
 * instead of just string. Here we just need to wrap in `` to get Mdx to ignore
 * trying to render this component...
 */
const pRule = {
  filter: 'p',
  replacement: content => {
    const newContent = replaceTags(content);
    return '\n\n' + newContent + '\n\n';
  },
};

/**
 * See comment for `p` rule above
 */
const blockquoteRule = {
  filter: 'blockquote',
  replacement: (content, node) => {
    const { classList } = node;

    // Medium gives us rendered HTML <noscript> tweets
    // Here we fish out the tweet status url and pass it
    // to Tweet component that will be rendered later
    // down the line
    if ([...classList].includes('twitter-tweet')) {
      const { href } = node.querySelector(':scope > p:last-child > a');

      const [, id] = href.match(/\/status\/(\d+)\/?$/);
      return `\n\n<Tweet tweetId="${id}" />\n\n`;
    }

    const newContent = replaceTags(content);
    return '\n\n>' + newContent + '\n\n';
  },
};

/*
 * Medium doesn't give us correct html (pre>code) just <pre>{content}</pre>
 * We fix that and then pass it to turndown
 */
const preRule = {
  filter: 'pre',
  replacement: (content, node, options) => {
    const { ownerDocument: document } = node;

    const codeElem = document.createElement('code');
    codeElem.innerHTML = node.innerHTML;

    const preElem = document.createElement('pre');
    preElem.appendChild(codeElem);
    [...codeElem.childNodes]
      .filter(child => child.nodeName === 'BR')
      .forEach(child => {
        codeElem.replaceChild(document.createTextNode('\n'), child);
      });

    return options.rules.fencedCodeBlock.replacement(content, preElem, options);
  },
};

const scriptRule = {
  filter: ['script', 'style'],
  replacement: () => '',
};

/**
 * Medium wraps github gists like this:
 * <iframe>
 *    <a href="{medium link}"/>
 * </iframe>
 *
 * Here {medium link} is a url that redirects to a gist
 * which is then rendered to the page in their own way.
 *
 * Further along in the process we follow this link
 * and get the final URL.
 *
 */
const iframeRule = {
  filter: 'iframe',
  replacement: (_, node) => {
    // iframes can only have text node children, so we parse the HTML in a new element
    const { ownerDocument: document } = node;

    const elem = document.createElement('div');
    elem.innerHTML = node.innerHTML;
    return `\n<iframecontent:"${elem.querySelector('a').href}">\n`;
  },
};

const getImageMeta = function(imgSrc) {
  const { pathname } = new URL(imgSrc);
  const { base: name, ext = '.jpg' } = path.parse(pathname);
  return { name, ext };
};
/**
 * Medium gives us images with a caption:
 *
 * <figure>
 *    <img src="image_src" alt=""/>
 *    <figcaption>
 *      {HTML and text nodes}
 *    </figcaption>
 * </figure>
 *
 * The replace rule below returns
 *
 * <image:${image_hash}>
 *
 * and adds to the array of images we then attach to
 * `post` array.
 *
 * To note: turndown uses JSdom to parse the string,
 * here we have access to most DOMNode API methods to
 * calculate the inner values of DOM nodes
 */
const makeImgRule = images => ({
  filter: 'figure',
  replacement: (_, node) => {
    const { src, alt } = node.querySelector('img');
    const { name, ext } = getImageMeta(src);

    const captionTag = node.querySelector('figcaption');
    const caption = captionTag
      ? new TurndownService(turndownOptions).turndown(captionTag)
      : undefined;

    images.push({ src, ext, alt, name, caption });

    return `\n<image:${name}>\n`;
  },
});

const transformHtmlToMarkdown = posts =>
  posts.map(({ html, ...rest }) => {
    const turndownService = new TurndownService(turndownOptions);

    turndownService.addRule('p', pRule);
    turndownService.addRule('blockquote', blockquoteRule);
    turndownService.addRule('pre', preRule);
    turndownService.addRule('script', scriptRule);
    turndownService.addRule('iframe', iframeRule);
    const images = [];
    turndownService.addRule('img', makeImgRule(images));

    const content = turndownService.turndown(html);

    return {
      ...rest,
      content,
      images,
    };
  });

module.exports = transformHtmlToMarkdown;
