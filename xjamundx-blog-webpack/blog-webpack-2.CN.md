# [blog-webpack-2.md](https://gist.github.com/xjamundx/b1c800e9282e16a6a18e)

这是我最近发布在[我的个人博客](http://www.jamund.com/)里的[Require.js to Webpack - Party 1 (the why)](http://j-query.blogspot.com/2015/06/from-requirejs-to-webpack-part-1-reasons.html)的文章的后续。

在那篇文章中，我重点说了三种从require.js迁移到webpack的原因：

1. 支持Common JS
2. 支持NPM
3. 一个更为健壮的加载器/插件生态系统。

在这篇文章中，我会讨论一些迁移过程中，我们会遇到的技术挑战。尽管有显著的益处，但是在开发过程中设置也是相当困难的。我会处理一些我们遇到的挑战，从而使它稍稍的简单一些。

## 从 `paths` 到NPM的 `alias`

在从require.js转移到webpack中第一件需要做的事情就是将整个require.js的配置文件转移到`webpack.config.js`文件。

在实践中，这意味着需要解决三个问题：

1. 告诉webpack你的JS文件放在那里
2. 在`require.js`配置文件中那个巨大的`paths`列表
3. 所有的`shim`配置项

### 模块路径的解析

第一件事情是告诉webpack你的js文件放在那里。Require.js通常可以依据用来启动它的`<script>`标签推断出根路径。或者你也可能使用`baseUrl`配置了这个路径。

在webpack中设置这些东西是很简单的，只需要添加如下的配置项：

```json
{
  "reslove" : {
    "modulesDirectories": ["public/js"]
  }
}
```

如果你忘了设置这个，那么webpack很可能会假定路径为`node_modules`。

### 将Require.js 的`paths` 迁移到webpack的`alias`

最开始转换流程就是直接进行转换。

起初有一个跟下面一样的配置：

```javascript
requirejs.config({
  paths: {
    "backbone": "lib/backbone-1.1.0",
    "jquery": "lib/jquery-1.10.2",
    "underscore": "lib/lodash.underscore-2.3.0",
    "jqueryUI": "lib/jquery-ui.min"
  }
});
```

这个可以很直接的转换成webpack中的配置项：

```javascript
module.exports = {
  resolve: {
    alias: {
      "backbone": "lib/backbone-1.1.0",
      "jquery": "lib/jquery-1.10.2",
      "underscore": "lib/lodash.underscore-2.3.0",
      "jqueryUI": "lib/jquery-ui.min"
    }
  }
}
```

看，真的很简单！

更多信息请查阅：

- [http://requirejs.org/docs/api.html#config-paths](http://requirejs.org/docs/api.html#config-paths)
- [http://webpack.github.io/docs/configuration.html#resolve-alias](http://webpack.github.io/docs/configuration.html#resolve-alias)

### 为每一个shim找到一个加载器

下一步，需要额外注意的，是确认我们的shim配置项。这比它看起来要稍稍的困难一些，这是因为很容易就会忘了shim里真正进行操作的是什么。让我们重温一下shim。

一个require.js的shim 会将AMD不兼容的模块用少量代码包裹起来从而使他们变得可以兼容AMD，能够被其他模块所依赖。

通过下面的简单的例子让我们来查看一下这是如何工作的：

```javascript
{
  shim: {
    "underscore": {
       exports: "_"
     },
     "backbone": {
       deps: ["jquery", "underscore"],
       exports: "Backbone"
     }
  }
}
```

这里我们为[underscore](http://underscorejs.org/)和[backbone](http://backbonejs.org/)配置了shim。对underscore而言，shim会包裹库文件然后在所有依赖它的脚本中，返回`_`变量的值。Backbone的情况会稍微复杂些：

1.
