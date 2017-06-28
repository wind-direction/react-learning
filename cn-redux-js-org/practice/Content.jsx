import React from 'react';
import store from './store';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      info: store.getState()
    };
  }

  render() {
    const strInfo = JSON.stringify(this.state.info, null, '  ');
    return (<pre>
      {strInfo}
    </pre>);
  }
}

export default Content;
