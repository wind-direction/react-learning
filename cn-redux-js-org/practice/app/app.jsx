import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Content from './component/Content';

const app = document.createElement('div');
app.setAttribute('id', 'app');
document.body.appendChild(app);
ReactDOM.render(
  <Provider store={store}>
    <Content />
  </Provider>,
  app);
