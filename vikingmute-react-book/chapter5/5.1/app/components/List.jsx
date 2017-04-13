import React, { PropTypes } from 'react';

const propType = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

function List({ items, onDelete }) {
  const itemList = items.map(item => (
    <li key={item.id}>
      <button onClick={() => { onDelete(item.id); }}>删除</button>
      {item.content}
    </li>
  ));

  return (
    <ul>
      <h2>这是今天的代办事项</h2>
      {itemList}
    </ul>
  );
}

List.propTypes = propType;

export default List;

