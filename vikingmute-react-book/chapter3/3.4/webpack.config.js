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


module.exports = {
    entry : {
        app : path.resolve(APP_PATH, 'index.jsx')
    },
    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },
    //开启dev source map
    devtool : 'eval-source-map',
    //开启 webpack dev server
    devServer : {
        host : tools.getLocalIps(),
        historyApiFallback : true,
        hot : true,
        inline: true
    },
    module : {
        loaders : [
            //配置preLoaders,将eslint添加进入
            {
                enforce : 'pre',
                test : /\.jsx?$/,
                loaders : ['eslint-loader'],
                include : APP_PATH,
                exclude : [/node_modules/]
            },
            //配置loader，将Babel添加进去
            {
                test : /\.jsx?$/,
                loaders : ['babel-loader'],
                include : APP_PATH
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'My First React App'
        })
    ],
    resolve : {
        extensions : ['.js','.jsx']
    }
};