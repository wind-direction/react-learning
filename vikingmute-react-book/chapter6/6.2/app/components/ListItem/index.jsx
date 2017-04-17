/**
 * @file: component Item
 * Created by wind on 17/3/21.
 * @todo:
 */

import React from 'react';
import PropTypes from 'prop-types';

// 属性验证
const propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

// 组件主体，这里是stateless function, 所以直接就是一个函数
function ListItem({ item, onClick }) {
  let formatTime = '未知时间';
  if (item.time) {
    formatTime = new Date(item.time).toISOString().match(/(\d{4}-\d{2}-\d{2})/)[1];
  }
  // 返回JSX结构
  return (
    <button className="list-group-item item-component" onClick={onClick}>
      <span className="item-title">{item.title}</span>
      <span className="pull-right text-muted small">
        <em>{formatTime}</em>
      </span>
    </button>
  );
}

// 添加验证
ListItem.propTypes = propTypes;

// 导出组件
export default ListItem;
