/* eslint-disable no-console */
const { default: Map } = require('apr-map')
/**
 * This is a simple html to markdown converter using turndown
 * the main reason for this file is mainly so that we can use
 * it to convert the HTML from the RSS feeds but hopefully the
 * html from the medium export we have.
 *
 * We need a custom solution to be able to convert the iframes
 * the MDX element we're going to generate gist snippets with.
 */
const { URL } = require('url')
const path = require('path')

const TurndownService = require('turndown')
const turndownService = new TurndownService()

let images = []

const getImageMeta = function(imgSrc) {
  const imgPath = new URL(imgSrc).pathname
  let imgFileName = path.basename(imgPath)

  const parsed = path.parse(imgFileName)
  const name = parsed.name.replace(/[^a-zA-Z0-9]/g, '__')
  const ext = parsed.ext ? parsed.ext : '.jpg' // if no extension, add .jpg

  imgFileName = name + ext

  return { name: imgFileName, ext }
}

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
turndownService.addRule('iframe', {
  filter: 'iframe',
  replacement: content => {
    const [, href] = content.match(/href="(.*)">/)

    return `<iframecontent:"${href}"> `
  }
})

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
turndownService.addRule('img', {
  filter: 'figure',
  replacement: (_, node) => {
    const childNodes = Array.from(node.childNodes)

    // Find the figcatpion in the figure node
    const capTag = childNodes.find(n => n.nodeName === 'FIGCAPTION')
    let caption

    // Not all images have a figcaption!
    if (capTag) {
      // The final caption value is a markdown string
      // that we render directly to the DOM with ReactMarkdown
      // in the client. This markdown is NOT parsed by MDX
      // by the gatsby build command
      caption = Array.from(capTag.childNodes).reduce((acc, curr) => {
        const tag = curr.nodeName
        let tagcontent

        // Transforms a few HTML elements that we know we
        // should be including.
        switch (tag) {
          case 'A': {
            const text = curr.textContent

            const url = new URL(curr.getAttribute('href'))
            const strippedQueryParams = url.origin + url.pathname

            tagcontent = `[${text}](${strippedQueryParams})`
            break
          }
          case 'STRONG': {
            tagcontent = `**${curr.textContent}**`
            break
          }
          case '#text': {
            tagcontent = curr.textContent
            break
          }
          default:
            console.warn('Missing tag link - ', tag)
            tagcontent = curr.textContent
            break
        }

        return acc + tagcontent
      }, '')
    }

    const imgNode = childNodes.find(n => n.nodeName === 'IMG')

    const imageSrc = imgNode.getAttribute('src')
    const imageAlt = imgNode.getAttribute('alt')

    const { name, ext } = getImageMeta(imageSrc)

    const newImage = {
      src: imageSrc,
      ext,
      alt: imageAlt,
      name,
      caption
    }

    images.push(newImage)

    return `<image:${name}>`
  }
})

/**
 * When Gatsby builds, Mdx tries to render <React.Suspense/> as a component
 * instead of just string. Here we just need to wrap in `` to get Mdx to ignore
 * trying to render this component...
 */
turndownService.addRule('p', {
  filter: 'p',
  replacement: content => {
    const newContent = content.replace(/<([^>]*)>/g, (_, match) => {
      if (match) {
        return '`<' + match + '>`'
      }
    })

    return '\n\n' + newContent + '\n\n'
  }
})

/**
 * See comment for `p` rule above
 */
turndownService.addRule('blockquote', {
  filter: 'blockquote',
  replacement: (content, node) => {
    const className = node.getAttribute('class')

    // Medium gives us rendered HTML <noscript> tweets
    // Here we fish out the tweet status url and pass it
    // to Tweet component that will be rendered later
    // down the line
    if (className === 'twitter-tweet') {
      const anchor = Array.from(node.childNodes[1].childNodes)
        .find(n => n.nodeName === 'A')
        .getAttribute('href')

      const [, id] = anchor.match(/\/status\/(\d+)/)
      return `\n\n<Tweet tweetId="${id}" />\n\n`
    }

    const newContent = content.replace(/<([^>]*)>/g, (_, match) => {
      if (match) {
        return `&lt;${match}&gt;`
      }
    })

    // eslint-disable-next-line no-useless-concat
    return '\n\n' + '>' + newContent + '\n\n'
  }
})

turndownService.addRule('pre', {
  filter: 'pre',
  replacement: content => {
    const newContent = content.replace(/\*\*(\w*)\*\*/gm, (_, match) => match)
    /**
     * Same rules as from turndown codeblocks, see here:
     * https://github.com/domchristie/turndown/blob/master/src/commonmark-rules.js#L111
     *
     * medium doesn't give us correct html (pre>code) just <pre>{content}</pre>
     * so we have to manage it ourselves
     */
    // eslint-disable-next-line no-useless-concat
    return '\n\n' + '```' + '\n' + newContent + '\n' + '```' + '\n\n'
  }
})

turndownService.addRule('script', {
  filter: ['script', 'style'],
  replacement: () => {
    return '\n'
  }
})

module.exports = posts =>
  Map(posts, ({ html, ...rest }) => {
    images = []

    const md = turndownService.turndown(html, {
      codeBlockStyle: 'fenced'
    })

    return {
      ...rest,
      md,
      images
    }
  })
