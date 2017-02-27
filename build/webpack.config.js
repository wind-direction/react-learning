/******************************************************************************
 *                              Node核心库
 ******************************************************************************/
var glob = require('glob');
var path = require('path');
var webpack = require('webpack');


/******************************************************************************
 *                              自定义方法
 ******************************************************************************/
var pickFiles = function(options){
    var files = glob.sync(options.pattern);
    return files.reduce(function(data, filename) {
        var matched = filename.match(options.id);
        var name = matched[1];
        data[name] = path.resolve(__dirname, filename);
        return data;
    }, {});
};

/******************************************************************************
 *                              静态常量
 ******************************************************************************/
var ROOT_PATH = path.resolve(__dirname, '../');         // 项目根路径
var SRC_PATH = ROOT_PATH + '/src';                      // 项目源码路径
var DIST_PATH = ROOT_PATH + '/dist';                    // 产出路径
var CACHE_PATH = ROOT_PATH + '/cache';                  // 使用缓存
var __DEV__ = process.env.NODE_ENV !== 'production';    // 是否是开发环境

// conf
var alias = pickFiles({
    id: /(conf\/[^\/]+).js$/,
    pattern: SRC_PATH + '/conf/*.js'
});

// components
alias = Object.assign(alias, pickFiles({
    id: /(components\/[^\/]+)/,
    pattern: SRC_PATH + '/component/*/index.js'
}));

// reducers
alias = Object.assign(alias, pickFiles({
    id: /(reducers\/[^\/]+).js/,
    pattern: SRC_PATH + '/redux/reducers/*'
}));

// actions
alias = Object.assign(alias, pickFiles({
    id: /(actions\/[^\/]+).js/,
    pattern: SRC_PATH + '/redux/actions/*'
}));


var config = {
    context: SRC_PATH,
    entry: {
        app: ['./app/app.js']
    },
    output: {
        path: DIST_PATH,
        filename: 'output/bundle.js'
    },
    module: {
        loaders : [
            // 使用 babel 编译 jsx、es6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: SRC_PATH,
                // 这里使用 loaders ，因为后面还需要添加 loader
                loaders: ['babel?cacheDirectory=' + CACHE_PATH]
            },
            //编译sass
            {
                test: /\.(scss|css)$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    resolve: {
        alias: alias
    },
    plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};

module.exports = config;