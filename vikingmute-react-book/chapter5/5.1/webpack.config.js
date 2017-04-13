var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var tools = require('./tools');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    host: tools.getLocalIps(),
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  module: {
    loaders: [
      //配置preLoaders,将eslint添加进入
      {
        enforce : 'pre',
        test : /\.jsx?$/,
        loaders : ['eslint-loader'],
        include : APP_PATH
      },
      //配置loader，将Babel添加进去
      {
        test : /\.jsx?$/,
        loaders : ['babel-loader'],
        include : APP_PATH
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '《React 全栈》Flux 架构及其实现'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watchOptions: { poll: 1000 }
};