const Xml2Js = require('xml2json')
const { default: Map } = require('apr-map')
const Get = require('lodash.get')

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

    const [, slug] = link.match(/yld-blog\/([^?]*)/)
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
