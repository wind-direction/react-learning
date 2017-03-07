## 环境依赖

```bash
npm install webpack webpack-dev-server --save-dev #不能全局安装，否则容易出现问题
#连接webpack和webpack-dev-server
npm link webpack
npm link webpack-dev-server
#启动服务
webpack-dev-server --host 0.0.0.0 --port 8080 --watch-poll
```