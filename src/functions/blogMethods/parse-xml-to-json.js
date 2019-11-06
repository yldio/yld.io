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

const parseXmlToJson = async data => {
  const parsed = await Xml2Js.toJson(data, { object: true })

  return Map(Get(parsed, 'rss.channel.item', []), res => {
    const {
      title,
      link,
      category: tags = [],
      'dc:creator': authorName,
      pubDate,
      'content:encoded': html
    } = res

    const { pathname } = new URL(link)
    const [, slug] = slugWithoutHexRegex.exec(basename(pathname))

    return {
      title,
      link,
      tags: Array.isArray(tags) ? tags : [tags],
      authorName,
      firstPublishedAt: new Date(pubDate).toISOString(),
      html,
      slug
    }
  })
}

module.exports = parseXmlToJson
