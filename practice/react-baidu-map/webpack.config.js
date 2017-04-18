var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var tools = require('./tools');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    host: tools.getLocalIps(),
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  resolve: {
    extensions: ['.js', '.jsx','.scss', '.less']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        enforce : 'pre',
        loaders: ['eslint-loader'],
        include: APP_PATH
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: APP_PATH
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
    new HtmlwebpackPlugin({
      title: '在react中使用百度地图'
    })
  ],
  watchOptions: { poll: 1000 }
};

