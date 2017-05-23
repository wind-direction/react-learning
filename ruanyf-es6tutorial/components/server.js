/**
 * todo： 创建临时的服务器
 * ref: https://github.com/request/request-promise-native/blob/master/test/fixtures/server.js
 * Created by wind on 17/5/23.
 */
import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';

let ROOT_PATH = path.resolve(__dirname, '../');

export const startServer = (port, cb) => {
  let server = http.createServer(function (req, response) {
    let path = url.parse(req.url).pathname;
    // 暂时只支持json文件的读取
    fs.createReadStream(ROOT_PATH + path).pipe(response);
  });
  // 监听端口
  server.listen(port, function () {
    cb(function stopServer(done) {
      setTimeout(function () {
        server.close();
        done();
      }, 20);
    });
  });
};

