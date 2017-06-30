import React from 'react';
import store from '../../store/store';
import './index.scss'

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      info: store.getState()
    };
  }

  render() {
    const strInfo = "原始store.getState():\n" + JSON.stringify(this.state.info, null, '\t');
    return (
      <div className="wrapper">
        <div className="aside">-</div>
        <div className="content">
              <pre>
                {strInfo}
              </pre>
        </div>
      </div>
    );
  }
}

export default Content;
