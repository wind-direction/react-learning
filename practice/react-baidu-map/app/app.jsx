import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import 'bootstrap/less/bootstrap.less';
import './app.scss';

import dashBoard from './components/dashBoard';
import rootReducer from './reducers';
import * as actionCreators from './actions';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

const App = connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(dashBoard);

const element = document.createElement('div');
element.setAttribute('id', 'wrapper');
const container = document.body.appendChild(element);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
