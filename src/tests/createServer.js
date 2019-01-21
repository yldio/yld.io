const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const http = require('http')
const finalhandler = require('finalhandler')
const config = require('./lh-config.js')
const serveStatic = require('serve-static')

const serve = url => {
  const servePublic = serveStatic('./public')

  const server = http.createServer((req, res) => {
    const done = finalhandler(req, res)
    servePublic(req, res, done)
  })

  server.listen(3001)

  return chromeLauncher.launch({ chromeFlags: [] }).then(chrome => {
    return lighthouse(url, { port: chrome.port }, config).then(results => {
      server.close()
      return chrome.kill().then(() => results)
    })
  })
}

module.exports = serve
