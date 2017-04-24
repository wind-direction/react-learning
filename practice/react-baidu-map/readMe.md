# baidu-map-react-demo

## 设计

### 文件夹设计

```bash
|- app
|   |- app.jsx
|   |- app.scss
|   |- components
|   |   |- baiduMap
|   |   |- content
|   |   |- dashBoard
|   |   |- lib
|   |   |- topNav
```

构造`wrapper`方法，用来包装组件，并生成新组件。在生成新组件的时候，需要异步的获取第三方的JS，并为其提供回调。

采用这种方式进行第三方库引入，最重要的一点就是在`onload`事件中，对组件的状态进行更新，并由此，重绘组件，实现第三方库的初始化。


## 附录

[How to Write a Google Maps React Component](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)

[fullstackreact/google-maps-react](https://github.com/fullstackreact/google-maps-react)