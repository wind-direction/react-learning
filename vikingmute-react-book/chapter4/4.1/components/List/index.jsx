/**
 * @file: List component
 * Created by wind on 17/3/21.
 * @todo: 左侧的列表组件，无状态变换，使用纯函数定义方式(stateless function)
 */

import React, { PropTypes } from 'react';
import ListItem from '../ListItem';

const propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

function List({ items, onSelect }) {
  const itemsContent = items.map(
    item => (
      <ListItem
        item={item}
        key={item.id}
        onClick={() => onSelect(item.id)}
      />
    )
  );

  return (
    <div className="list-component">
      {itemsContent}
    </div>
  );
}

List.propTypes = propTypes;

export default List;

