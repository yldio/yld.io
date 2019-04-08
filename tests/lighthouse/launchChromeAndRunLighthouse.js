const createServer = require('../createServer')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const config = require('./lh-config.js')

const launchChromeAndRunLighthouse = url => {
  const server = createServer(3001)

  return chromeLauncher.launch({ chromeFlags: [] }).then(chrome => {
    return lighthouse(url, { port: chrome.port }, config).then(results => {
      server.close()
      return chrome.kill().then(() => results)
    })
  })
}

module.exports = launchChromeAndRunLighthouse
