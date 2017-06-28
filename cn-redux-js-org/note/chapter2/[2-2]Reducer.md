# [Reducer](http://cn.redux.js.org/docs/basics/Reducers.html)

## 定义

reducer用来指明应用如何更新state。

## 设计State结构

## Action处理

- reducer是一个纯函数，接收旧的state和action，返回新的state。
- **永远不要**在reducer里做以下操作：

    - 修改传入参数；
    - 执行有副作用的操作，如API请求和路由跳转；
    - 调用非纯函数，如`Date.now()` 或 `Math.random()`。

- 必须保证传入的参数相同， 那么获取的state一定相同。

## 注意

- 不要修改**state**。使用`Object.assign()`返回新的副本。
- 在`default`的情况下需要返回旧的state。
- `combineReducers()` 所做的只是生成一个函数，这个函数来调用你的一系列 reducer
