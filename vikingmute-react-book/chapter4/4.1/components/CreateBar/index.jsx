/**
 * @file: 
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
    <a href="#" onClick={onClick} className="list-group-item create-bar-component">
      + 创建新的文章
    </a>
  );
}

CreateBar.propTypes = propType;

export default CreateBar;
