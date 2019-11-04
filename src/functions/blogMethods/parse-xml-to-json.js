const Xml2Js = require('xml2json')
const { URL } = require('url')
const { basename } = require('path')
const { default: Map } = require('apr-map')
const Get = require('lodash.get')

/**
 * slug: 'optimize-with-http-2-server-push-and-service-workers-f39c04d8bd7d',
 * newSlug: 'optimize-with-http-2-server-push-and-service-workers'
 */
const slugWithoutHexRegex = /^(.+)-[0-9a-f]{8,}$/

module.exports = async (data, key = 'rss.channel.item') => {
  const parsed = await Xml2Js.toJson(data, { object: true })

  return Map(Get(parsed, key, []), res => {
    const {
      title,
      link,
      category: tags = [],
      'dc:creator': authorName,
      pubDate,
      'content:encoded': content
    } = res

    const pathname = new URL(link).pathname
    const [, slug] = slugWithoutHexRegex.exec(basename(pathname))

    const firstPublishedAt = new Date(pubDate)

    return {
      title,
      link,
      tags: Array.isArray(tags) ? tags : [tags],
      authorName,
      firstPublishedAt: firstPublishedAt.toISOString(),
      html: content,
      slug
    }
  })
}
