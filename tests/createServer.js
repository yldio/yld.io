const http = require('http')
const compression = require('compression')
const { promisify } = require('util')
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')

const compressionHandler = promisify(compression())

const createServer = () => {
  const servePublic = serveStatic('./public')

  const server = http.createServer(async (req, res) => {
    await compressionHandler(req, res)
    const done = finalhandler(req, res)
    servePublic(req, res, done)
  })

  server.listen(3001)

  return server
}

module.exports = createServer
