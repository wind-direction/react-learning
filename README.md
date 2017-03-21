## 环境依赖

|                      | 版本  |
|:---------------------|:-----:|
|node                  |7.7.3  |
|npm                   |4.1.2  |
|react                 |15.4.2 |
|webpack               |2.2.1  |
|webpack-dev-server    |2.4.2  |

### 安装node

#### nvm

#### 全局安装

[node-releases](https://nodejs.org/dist/)

```bash
$ cd ~
$ wget https://nodejs.org/dist/latest/node-v7.7.3-linux-x64.tar.xz
$ xz -d node-v7.7.3-linux-x64.tar.xz
$ mv node-v7.7.3-linux-x64.tar /opt/node-v7.7.3-linux-x64.tar
$ cd /opt/
$ tar -xvf node-v7.7.3-linux-x64.tar
$ mv node-v7.7.3-linux-x64 node
# 在/etc/profile.d/中创建node-config.sh
$ vim /etc/profile.d/node-config.sh

#!/bin/sh

export NODE_HOME=/opt/node
export PATH=$NODE_HOME/bin:$PATH

$ source /etc/profile.d/node-config.sh
$ node -v
```


### 安装全局依赖

```bash
npm install -g webpack webpack-dev-server
```

## webpack的2.X版本支持

删除 module中的preLoaders 和postLoaders
并且限制了module.exports的第一层key, 很多属性变成了unknow property的警告。具体的变更请查看[webpack版本变更](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.23)
