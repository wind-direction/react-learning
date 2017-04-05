/**
 * File : webpack.config.js
 * Todo :
 * author: wind.direction.work@gmail.com
 * Created by wind on 17/2/28.
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var tools = require('./tools');
//一些常用的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var COMPONENT_PATH = path.resolve(ROOT_PATH, 'components');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //开启dev source map
  devtool: 'eval-source-map',
  //开启 webpack dev server
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
        include : [ APP_PATH, COMPONENT_PATH ]
      },
      //配置loader，将Babel添加进去
      {
        test : /\.jsx?$/,
        loaders : ['babel-loader'],
        include :  [ APP_PATH, COMPONENT_PATH ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader : 'url-loader', options : { limit : 10000, mimetype : 'application/font-woff' } }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader : 'url-loader', options : { limit : 10000, mimetype : 'application/octet-stream' } }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader : 'url-loader', options : { limit : 10000, mimetype : 'image/svg+xml' } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My First React App'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss']
  },
  resolveLoader: {
    alias: {
      'less-loader': path.resolve(ROOT_PATH,'node_modules/less-loader/dist/index.js')
    }
  }
};
