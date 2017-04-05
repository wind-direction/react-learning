/**
 * @file: CreateBar/index.jsx
 * Created by wind on 17/3/21.
 * @todo:
 */

import React, { PropTypes } from 'react';

import './style.scss';

const propType = {
  onClick: PropTypes.func.isRequired
};

function CreateBar({ onClick }) {
  return (
    <button onClick={onClick} className="list-group-item create-bar-component">
      + 创建新的文章
    </button>
  );
}

CreateBar.propTypes = propType;

export default CreateBar;
