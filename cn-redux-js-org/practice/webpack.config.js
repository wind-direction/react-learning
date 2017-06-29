var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var tools = require('./tools');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = ROOT_PATH;
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx')
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
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: APP_PATH
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ],
        include: APP_PATH
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader : 'url-loader', options : { limit : 10000, mimetype : 'image/png' } }
        ]
      }
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: '练习'
    })
  ],
  watchOptions: { poll: 1000 }
};

