const isProd = require('./is-prod');

// When trying out things with the master environment,
// prefer changing this to enabling prod mode,
// because prod mode will also enable image / post publishing
// const environmentName = 'master';
module.exports = isProd ? 'master' : 'development';
