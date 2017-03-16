/**
 * File : webpack.config.js
 * Todo :
 * author: wind.direction.work@gmail.com
 * Created by wind on 17/2/28.
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//一些常用的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


module.exports = {
    entry : {
        app : path.resolve(APP_PATH, 'index.jsx')
    },
    output : {
        path : BUILD_PATH,
        filename : 'bundle.js'
    },
    //开启dev source map
    devtool : 'eval-source-map',
    //开启 webpack dev server
    devServer : {
        historyApiFallback : true,
        hot : true,
        inline: true,
        progress : true,
    },
    module : {
        //配置loader，将Babel添加进去
        loaders : [
            {
                test : /\.jsx?$/,
                loaders : ['eslint'],
                include : APP_PATH
            },
            {
                test : /\.jsx!$/,
                loaders : ['babel'],
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