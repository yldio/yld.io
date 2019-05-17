const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  externals: [nodeExternals()],
  mode: 'production',
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false
            }
          }
        ]
      }
    ]
  }
}
