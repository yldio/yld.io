const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const { NODE_ENV } = process.env
module.exports = {
  externals: [nodeExternals()],
  mode: NODE_ENV,
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
