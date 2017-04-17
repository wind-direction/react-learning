/**
 * @file:
 * Created by wind on 17/3/21.
 * @todo:
 */

import React from 'react';
import PropTypes from 'prop-types';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemShowLayer from '../ItemShowLayer';
import ItemEditor from '../ItemEditor';
import Map from '../Map';

import './style.scss';

const propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

class DeskMark extends React.Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchEntryList();
  }

  onSelect(point) {
    console.log(this.state, point);
  }

  render() {
    const { state, actions } = this.props;
    const { isEditing, selectedId } = state.editor;
    const items = state.items;
    const item = items.find(
      ({ id }) => id === selectedId
    ) || {};

    // 根据editing状态来决定要显示ItemEditor 组件还是ItemShowLayer 组件， 并且将回调方法都传入组件中
    const mainPart = isEditing
      ? (
        <ItemEditor
          item={item}
          onSave={actions.saveEntry}
          onCancel={actions.cancelEdit}
        />
      )
      : (
        <ItemShowLayer
          item={item}
          onEdit={actions.editEntry}
          onDelete={actions.deleteEntry}
        />
      );

    const id = 'location';
    // 将交互回调添加到组件中
    return (
      <section className="deskmark-component">
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <span className="navbar-brand">Deskmark App</span>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-3 list-group">
              <CreateBar onClick={actions.createNewEntry} />
              <List
                items={items}
                onSelect={actions.selectEntry}
              />
            </div>
            {mainPart}
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12" style={{ padding: 0 }}>
              <div className="card card-block">
                <Map id={id} style={{ height: 300 }} onSelect={this.onSelect} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

DeskMark.propTypes = propTypes;

export default DeskMark;
