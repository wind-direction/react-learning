# [Stroe](http://cn.redux.js.org/docs/basics/Store.html)


- Store的职责：

    1. 维持应用的state；
    2. 提供`getState()`方法获取state；
    3. 提供`dispatch(action)` 方法更新state；
    4. 通过`subscribe(listener)`注册监听器；
    4. 通过`subscribe(listener)`返回的函数注销监听器。

- Redux应用只有一个单一的**store**

- `createStore()`的第二个参数是可选的, 用于设置 state 初始状态。