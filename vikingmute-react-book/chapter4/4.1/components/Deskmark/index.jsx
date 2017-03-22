/**
 * @file: 
 * Created by wind on 17/3/21.
 * @todo:
 */

import './style.scss';

import React from 'react';
import uuid from 'uuid';

import List from '../List';
import CreateBar from '../CreateBar';
import ItemShowLayer from '../ItemShowLayer';
import ItemEditor from '../ItemEditor';

class Deskmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedId: null,
      editing: false
    };

    this.createItem = this.createItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  /**
   * 选中某一个条目
   * @param id
   */
  selectItem(id) {
    if(id == this.state.selectedId) {
      return;
    }

    this.setState({
      selectedId: id,
      editing: false
    });
  }

  /**
   * 新增条目
   * @param item
   */
  saveItem(item) {
    // item是编辑器返回的对象,里面包括标题和内容

    // 当前的items state
    let items = this.state.items;

    item.id = uuid.v4();
    item.time = new Date().getTime();
    // 新的state
    items = [...items, item];
    //更新新的state
    this.setState({
      items: items
    });
  }

  /**
   * 创建一个新的条目
   */
  createItem() {
    // 将editing置为true,并且selectedId为null，表示要创建一个新的文章
    this.setState({
      selectedId: null,
      editing: true
    });
  }

  cancelEdit() {}

  editItem() {}

  deleteItem() {}

  render() {
    const { items, selectedId, editing } = this.state;

    // 选出当前被选中的文章
    const selected = selectedId && items.find(item => item.id === selectedId);
    // 根据editing状态来决定要显示ItemEditor 组件还是ItemShowLayer 组件， 并且将回调方法都传入组件中
    // 将交互回调添加到组件中
    return (
      <section className="deskmark-component">
        <div className="container">
          <div className="row">
            <CreateBar onClick={this.createItem} />
            <List items={this.state.items} onSelect={this.selectItem} />
            {editing ? (
              <ItemEditor item={selected} onSave={this.saveItem} onCancel={this.cancelEdit} />
            ) : (
              <ItemShowLayer item={selected} onEdit={this.editItem} onDelete={this.deleteItem} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Deskmark;