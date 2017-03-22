## 环境依赖

|                      | 版本  |
|:---------------------|:-----:|
|node                  |7.7.3  |
|npm                   |4.1.2  |
|react                 |15.4.2 |
|webpack               |2.2.1  |
|webpack-dev-server    |2.4.2  |
|node-sass             |4.5.0  |
|less                  |2.7.2  |

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

## 所遇到的问题

1. less-loader 找不到

```javascript
    //修改webpack.config.js文件
    resolveLoader: {
        alias: {
          'less-loader': path.resolve(ROOT_PATH,'node_modules/less-loader/dist/index.js')
        }
    }
    //这是因为less-loader的package.json文件中，指定了入口文件为：main:'dist/cjs.js'。但是从目录中并没有此文件，只有index.js文件
    //通过webpack --desplay-error-detail 可以看到webpack只会探查包中第一层中的index.*类文件，之后就会去根据main字段进行二次查找
    //所以此处需要指定less-loader的解析规则。
```