const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      server: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, 'src/server/index')
      ]
    },
    watch: true,
    target: 'node',
    externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })],
    mode: 'development',
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      }]
    },
    plugins: [
      new StartServerPlugin('server.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
      path: path.join(__dirname, 'dist/server'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    }
  }
}
