/**
 * @file: component Item
 * Created by wind on 17/3/21.
 * @todo:
 */

import React, { PropTypes } from 'react';

// 属性验证
const propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

// 组件主体，这里是stateless function, 所以直接就是一个函数
function ListItem({ item }) {
  // 返回JSX结构
  return (
    <a href="#" className="list-group-item item-component">
      <span class="label label-default label-pill pull-xs-right">
        {item.time}
      </span>
      {item.title}
    </a>
  );
}

// 添加验证
ListItem.propTypes = propTypes;

// 导出组件
export default ListItem;
