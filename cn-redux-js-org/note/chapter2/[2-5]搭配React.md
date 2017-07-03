# [搭配React](http://cn.redux.js.org/docs/basics/UsageWithReact.html)

Redux 通过action的形式来发起state变化。

## 容器组件和展示组件

Redux 的React 绑定库是基于[容器组件和展示组件相分离](../appendix/容器组件和展示组件相分离.md)的开发思想。

展示组件和容器组件的不同：

|              | 展示组件                  |容器组件                          |
|:-------------|:--------------------------|:---------------------------------|
|作用          | 描述如何展现（骨架、样式）|描述如何运行（数据获取、状态更新）|
|直接使用Redux | 否                        |是                                |
|数据来源      | props                     |监听Redux state                   |
|数据修改      | 从props调用回调函数       |向Redux派发actions                |
|调用方式      | 手动                      |通常有React Redux生成             |

## 设计组件层次结构

[React 开发思想](https://facebook.github.io/react/docs/thinking-in-react.html)

