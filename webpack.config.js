/**
 * File : webpack.config.js
 * Todo :
 * author: wind.direction.work@gmail.com
 * Created by wind on 17/2/28.
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : path.join(__dirname, 'index'),
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.css$/,
                loaders : ['style-loader', 'css-loader']
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'user Plugin'
        })
    ]
};