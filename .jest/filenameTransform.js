const { basename } = require('path');

module.exports = {
  process(_src, filename) {
    return 'module.exports = ' + JSON.stringify(basename(filename)) + ';';
  },
};
