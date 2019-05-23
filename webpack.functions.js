const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

// I don't think NODE_ENV is even set on the Netlify function environment...
const { NODE_ENV = 'production' } = process.env
module.exports = {
  externals: [nodeExternals()],
  mode: NODE_ENV,
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
