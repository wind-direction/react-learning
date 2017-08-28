## 环境依赖

|                      | 版本  |
|:---------------------|:-----:|
|node                  |7.7.3  |
|npm                   |4.1.2  |
|webpack               |2.2.1  |
|webpack-dev-server    |2.4.2  |

### 安装node

#### 全局安装

nodeJS的发布版本:[node-releases](https://nodejs.org/dist/)

```bash
$ cd ~
$ wget https://nodejs.org/dist/latest/node-v7.7.3-linux-x64.tar.xz
$ xz -d node-v7.7.3-linux-x64.tar.xz
$ tar -xvf node-v7.7.3-linux-x64.tar
$ mv node-v7.7.3-linux-x64 /usr/local/lib/node
$ cd /usr/bin/
$ ln -s ../local/lib/node/bin/node node
$ ln -s ../local/lib/node/bin/npm npm
```


## webpack的2.X版本支持

在webpack的2.X版本中，删除了module中的preLoaders 和postLoaders。并且限制了module.exports的第一层key, 很多属性变成了unknow property的警告。

具体的变更请查看[webpack版本变更](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.23)。

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

2. 调整了app,component的目录，将二者从父子级目录改成同级目录时，书中所述的配置文件会报出.jsx文件类型无法解析的错误。

需要将.jsx的预加载和加载器的include中增加相应的目录。

```javascript
{
  enforce : 'pre',
  test : /\.jsx?$/,
  loaders : ['eslint-loader'],
  include : [ APP_PATH, COMPONENT_PATH ]
},
//配置loader，将Babel添加进去
{
  test : /\.jsx?$/,
  loaders : ['babel-loader'],
  include :  [ APP_PATH, COMPONENT_PATH ]
},
```

## 附录

[vikingmute:React全栈(Redux+Flux+webpack+Babel整合开发)](git@github.com:vikingmute/webpack-react-codes.git)

