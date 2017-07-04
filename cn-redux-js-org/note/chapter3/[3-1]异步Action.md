# [异步Action](http://cn.redux.js.org/docs/advanced/AsyncActions.html)

- 两个关键的时刻：
    - 发起请求的时刻
    - 接收到响应的时刻

- 至少三种Action:
    - 通知reducer请求**开始**的action：切换state的isFetching标记
    - 通知reducer请求**成功**的action：数据合并至state，并重置isFetching
    - 通知reducer请求**失败**的action：