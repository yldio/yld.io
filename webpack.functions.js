const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  externals: [nodeExternals()],
  mode: 'development',
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
