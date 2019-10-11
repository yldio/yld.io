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
 * here {medium link} is a url that redirects to a gist
 * which is then rendered to the page in their own way.
 *
 */
turndownService.addRule('iframe', {
  filter: 'iframe',
  replacement: content => {
    const [, href] = content.match(/href="(.*)">/)

    return ` <iframecontent:"${href}"> `
  }
})

// parsing figure and figcaption for markdown
turndownService.addRule('img', {
  filter: 'figure',
  replacement: content => {
    const lines = content.split('\n')
    const caption = lines[1]
    const res = content.match(/!\[(.*)\]\((.*)\)/i)

    const [, alt, imgSrc] = res
    const { name, ext } = getImageMeta(imgSrc)

    images.push({
      src: imgSrc,
      ext,
      alt,
      name,
      caption
    })

    return `<image:${name}>`
  }
})

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

turndownService.addRule('blockquote', {
  filter: 'blockquote',
  replacement: content => {
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

module.exports = async ({ html, ...rest }) => {
  images = []

  const md = turndownService.turndown(html, {
    codeBlockStyle: 'fenced'
  })

  return {
    ...rest,
    md,
    images
  }
}
