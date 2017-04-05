/**
 * @file: List component
 * Created by wind on 17/3/21.
 * @todo: 左侧的列表组件，无状态变换，使用纯函数定义方式(stateless function)
 */

import React, { PropTypes } from 'react';
import ListItem from '../ListItem';

const propTypes = {
  items: PropTypes.array.isRequired
};

function List({ items }) {
  const itemsContent = items.map(
    item => (
      <ListItem item={item} key={item.id} />
    )
  );

  return (
    <div className="list-component col-md-4 list-group">
      {itemsContent}
    </div>
  );
}

List.propTypes = propTypes;

export default List;

