## 环境依赖

|           | 版本  |
|:----------|:-----:|
|node       |5.0.0  |
|react      |15.0.1 |
|webpack    |1.12.14|
|redux      |3.2.1  |

### 安装node

#### nvm

#### 全局安装

[node-releases](https://nodejs.org/dist/)

```bash
$ cd ~
$ wget https://nodejs.org/dist/v5.0.0/node-v5.0.0-linux-x64.tar.xz
$ xz -d node-v5.0.0-linux-x64.tar.xz
$ mv node-v5.0.0-linux-x64.tar /opt/node-v5.0.0-linux-x64.tar
$ cd /opt/
$ tar -xvf node-v5.0.0-linux-x64.tar
$ mv node-v5.0.0-linux-x64 node
# 在/etc/profile.d/中创建node-config.sh
$ vim /etc/profile.d/node-config.sh

#!/bin/sh

export NODE_HOME=/opt/node
export PATH=$NODE_HOME/bin:$PATH


$ source /etc/profile.d/node-config.sh
$ node -v
v5.0.0
```


### 安装全局依赖

```bash
npm install webpack webpack-dev-server --save-dev #不能全局安装，否则容易出现问题
#连接webpack和webpack-dev-server
npm link webpack
npm link webpack-dev-server
#启动服务
webpack-dev-server --host 0.0.0.0 --port 8080 --watch-poll
```