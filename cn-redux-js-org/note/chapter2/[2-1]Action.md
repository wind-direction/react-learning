# [Action](http://cn.redux.js.org/docs/basics/Actions.html)

## 定义

**Action**是吧数据从应用传到store的有效载荷。是store数据的**唯一**来源。

一般来说会通过`store.dispatch()`将action传到store。

## Action 创建函数

- Redux中把action创建函数的结果传给`dispatch()`即可以发起一次dispatch过程。
- 也可以创建一个**被绑定的action创建函数**来自动dispatch。

```javascript
const boundAddTodo = (text) => dispatch(addTodo(text));

boundAddTodo(text);
```

- store 可以直接通过`store.dispatch()`调用`dispatch()`方法，但多数情况下使用`react-redux`提供的`connect()`帮助器来调用。

## 笔记

- Action本质上是JavaScript的普通对象。
- 我们应该尽量减少在action中传递的数据。