const http = require('http');
const compression = require('compression');
const { promisify } = require('util');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
const waitOn = require('wait-on');

const compressionHandler = promisify(compression());

const createServer = async port => {
  const servePublic = serveStatic('./public');

  const server = http.createServer(async (req, res) => {
    await compressionHandler(req, res);
    const done = finalhandler(req, res);
    servePublic(req, res, done);
  });

  await new Promise(resolve => server.listen(port, resolve));

  await waitOn({ resources: [`http://localhost:${port}`] });

  return server;
};

module.exports = createServer;
