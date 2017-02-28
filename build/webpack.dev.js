/******************************************************************************
 *                              Node核心库
 ******************************************************************************/
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

/******************************************************************************
 *                              自定义模块
 ******************************************************************************/
var config = require('./webpack.config');

/******************************************************************************
 *                              自定义方法
 ******************************************************************************/
var getIP = function() {
    var os = require('os');
    var IPv4 = '127.0.0.1';
    var interfaces = os.networkInterfaces();
    for (var key in interfaces) {
        interfaces[key].some(function(details){
            if (details.family == 'IPv4' && key == 'en0') {
                IPv4 = details.address;
                return true;
            }
        });
    }
    return IPv4;
}

/******************************************************************************
 *                              静态常量
 ******************************************************************************/
var PORT = 8080;
var HOST = getIP();
var args = process.argv;
var hot = args.indexOf('--hot') > -1;
var deploy = args.indexOf('--deploy') > -1;
// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.output.publicPath = localPublicPath;
config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

new WebpackDevServer(webpack(config), {
    hot: hot,
    inline: true,
    compress: true,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
}).listen(PORT, HOST, function() {
        console.log(localPublicPath);
    });