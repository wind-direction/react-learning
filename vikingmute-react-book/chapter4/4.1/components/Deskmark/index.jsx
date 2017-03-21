/**
 * @file: 
 * Created by wind on 17/3/21.
 * @todo:
 */

import './style.scss';

import React, { PropTypes } from 'react';
import List from '../List';
import CreateBar from '../CreateBar';

class Deskmark extends React.Component {
  constructor() {
    super();

    this.createItem = this.createItem.bind(this);
  }

  createItem() {

  }

  render() {
    const items = [
      {
        "id": "reswwq21dsa1",
        "title": "hello",
        "content": "# testing markdown",
        "time": 1458030208359
      },
      {
        "id": "q21dsa22222",
        "title": "hello",
        "content": "# Hello word",
        "time": 1458030208359
      },
    ];

    return (
      <section className="deskmark-component">
        <div className="container">
          <div className="row">
            <CreateBar onClick={this.createItem} />
            <List items={items}/>
          </div>
        </div>
      </section>
    )
  }
}