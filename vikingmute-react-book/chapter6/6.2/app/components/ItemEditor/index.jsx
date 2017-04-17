/**
 * @file: ItemEditor/index.jsx
 * Created by wind on 17/3/21.
 * @todo: 编辑组件
 */

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const propTypes = {
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

class ItemEditor extends React.Component {
  render() {
    const { onSave, onCancel } = this.props;

    const item = this.props.item || {
      title: '',
      content: ''
    };

    // 判断是否已经选择了selectId,渲染按钮不同的文本
    const saveText = item.id ? '保存' : '创建';
    // 传入回调包裹方法
    const save = () => {
      onSave({
        ...item,
        // this.refs可以获得真实的dom节点，从而取得value
        title: this.title.value,
        content: this.content.value
      });
    };

    return (
      <div className="col-md-9 item-editor-component">
        <div className="control-area">
          <button onClick={save} className="btn btn-success">{saveText}</button>
          <button onClick={onCancel} className="btn btn-secondary">取消</button>
        </div>
        <div className="edit-area">
          <input ref={(title) => { this.title = title; }} placeholder="请填写标题" defaultValue={item.title} />
          <textarea ref={(content) => { this.content = content; }} placeholder="请填写内容" defaultValue={item.content} />
        </div>
      </div>
    );
  }
}

ItemEditor.propTypes = propTypes;

export default ItemEditor;
