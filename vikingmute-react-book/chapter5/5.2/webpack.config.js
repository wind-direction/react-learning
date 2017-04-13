var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var tools = require('./tools');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'app.js')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    host: tools.getLocalIps(),
    port: 8080,
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'handlebars': path.resolve(ROOT_PATH,'node_modules/handlebars/dist/handlebars.js')
    }
  },
  module: {
    loaders: [
      //配置preLoaders,将eslint添加进入
      {
        enforce : 'pre',
        test : /\.js?$/,
        loaders : ['eslint-loader'],
        include : APP_PATH
      },
      //配置loader，将Babel添加进去
      {
        test : /\.js?$/,
        loaders : ['babel-loader'],
        include : APP_PATH
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title : '5.2章节'
    })
  ],
  watchOptions: { poll: 1000 }
};