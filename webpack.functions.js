const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
