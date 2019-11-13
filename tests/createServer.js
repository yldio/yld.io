const http = require('http');
const compression = require('compression');
const { promisify } = require('util');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

const compressionHandler = promisify(compression());

const createServer = port => {
  const servePublic = serveStatic('./public');

  const server = http.createServer(async (req, res) => {
    await compressionHandler(req, res);
    const done = finalhandler(req, res);
    servePublic(req, res, done);
  });

  server.listen(port);

  return server;
};

module.exports = createServer;
