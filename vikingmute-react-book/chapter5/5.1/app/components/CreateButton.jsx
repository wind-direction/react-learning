import React, { PropTypes } from 'react';

const propType = {
  onClick: PropTypes.func.isRequired
};

function CreateButton({ onClick }) {
  return (
    <div className="createButtonComponent">
      <button onClick={() => { onClick(); }}>创建新的Todo</button>
    </div>
  );
}

CreateButton.propTypes = propType;

export default CreateButton;
