/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */

import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    // 挂载事件监听
    this.listeners = {};
  }
  // 组件初始化的时候，显示缓冲
  componentDidMount() {
    //获取当前位置
    this.loadMap();
  }
  // 加载地图
  loadMap() {

  }
}