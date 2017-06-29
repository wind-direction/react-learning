import React from 'react';
import store from './store';
import './Content.scss'

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      info: store.getState()
    };
  }

  render() {
    const strInfo = JSON.stringify(this.state.info, null, '  ');
    return (
      <div>
        <div>
          <div className="left"></div>
          <div className="content">
              <pre>
                {strInfo}
              </pre>
          </div>
        </div>
        <div>
          <div className="left2"></div>
          <div className="content2">
            <pre className="contentInner">{strInfo}</pre>
          </div>
        </div>
        <div className="container">
          <div className="left3"></div>
          <div className="content3"><pre>{strInfo}</pre></div>
          <div className="right3"></div>
        </div>
      </div>
    );
  }
}

export default Content;
