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
const { URL } = require('url')
const path = require('path')

const TurndownService = require('turndown')

/**
 * When Gatsby builds, Mdx tries to render <React.Suspense/> as a component
 * instead of just string. Here we just need to wrap in `` to get Mdx to ignore
 * trying to render this component...
 */
const pRule = {
  filter: 'p',
  replacement: content => {
    const newContent = content.replace(/<([^>]*)>/g, (_, match) => {
      if (match) {
        return '`<' + match + '>`'
      }
    })

    return '\n\n' + newContent + '\n\n'
  }
}

/**
 * See comment for `p` rule above
 */
const blockquoteRule = {
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
}

/* medium doesn't give us correct html (pre>code) just <pre>{content}</pre>
 * so we have to manage it ourselves
 */
const preRule = {
  filter: 'pre',
  replacement: (content, node, options) => {
    const { ownerDocument: document } = node

    const codeElem = document.createElement('code')
    codeElem.innerHTML = node.innerHTML

    const preElem = document.createElement('pre')
    preElem.appendChild(codeElem)
    ;[...codeElem.childNodes]
      .filter(child => child.nodeName === 'BR')
      .forEach(child => {
        codeElem.replaceChild(document.createTextNode('\n'), child)
      })

    return options.rules.fencedCodeBlock.replacement(content, preElem, options)
  }
}

const scriptRule = {
  filter: ['script', 'style'],
  replacement: () => {
    return '\n'
  }
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
const iframeRule = {
  filter: 'iframe',
  replacement: content => {
    const [, href] = content.match(/href="(.*)">/)

    return `<iframecontent:"${href}"> `
  }
}

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

const transformHtmlToMarkdown = posts =>
  posts.map(({ html, ...rest }) => {
    const turndownService = new TurndownService({ codeBlockStyle: 'fenced' })

    turndownService.addRule('p', pRule)
    turndownService.addRule('blockquote', blockquoteRule)
    turndownService.addRule('pre', preRule)
    turndownService.addRule('script', scriptRule)
    turndownService.addRule('iframe', iframeRule)
    const images = []
    turndownService.addRule('img', makeImgRule(images))

    const md = turndownService.turndown(html)

    return {
      ...rest,
      md,
      images
    }
  })

module.exports = transformHtmlToMarkdown
