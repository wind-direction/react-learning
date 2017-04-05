/**
 * @file:
 * Created by wind on 17/3/21.
 * @todo:
 */

import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './style.scss';


class DeskMark extends React.Component {
  constructor() {
    super();

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
    if (id === this.state.selectedId) {
      return;
    }

    this.setState({
      selectedId: id,
      editing: false
    });
  }

  /**
   * 新增条目
   * @param Item
   */
  saveItem(Item) {
    // item是编辑器返回的对象,里面包括标题和内容
    const item = Item;

    // 当前的items state
    let items = this.state.items;

    item.id = uuid.v4();
    item.time = new Date().getTime();

    // 新的state
    items = [...items, item];

    // 更新新的state
    this.setState({ items });
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

  cancelEdit() {
    this.setState({ editing: false });
  }

  editItem(Item) {
    const item = Item;

    let items = this.state.items;

    // new item
    if (!item.id) {
      items = [...items, {
        ...item,
        id: uuid.v4(),
        time: new Date().getTime()
      }];
      // existed item
    } else {
      items = items.map(
        exist => (
          exist.id === item.id
            ? {
              ...exist,
              ...item
            }
            : exist
        )
      );
    }

    this.setState({
      items,
      selectedId: item.id,
      editing: false
    });
  }

  deleteItem(id) {
    if (!id) {
      return;
    }

    this.setState({
      items: this.state.items.filter(
        result => result.id !== id
      )
    });
  }

  render() {
    const { items, selectedId, editing } = this.state;

    // 选出当前被选中的文章
    const selected = selectedId && items.find(item => item.id === selectedId);
    // 根据editing状态来决定要显示ItemEditor 组件还是ItemShowLayer 组件， 并且将回调方法都传入组件中
    const mainPart = editing
      ? (
        <ItemEditor
          item={selected}
          onSave={this.saveItem}
          onCancel={this.cancelEdit}
        />
      )
      : (
        <ItemShowLayer
          item={selected}
          onEdit={this.editItem}
          onDelete={this.deleteItem}
        />
      );
    // 将交互回调添加到组件中
    return (
      <section className="deskmark-component">
        <div className="container">
          <div className="row">
            <div className="col-md-4 list-group">
              <CreateBar onClick={this.createItem} />
              <List
                items={this.state.items}
                onSelect={this.selectItem}
              />
            </div>
            {mainPart}
          </div>
        </div>
      </section>
    );
  }
}

export default DeskMark;
