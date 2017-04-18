import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import 'bootstrap/scss/bootstrap.scss';

import DeskMark from './components/DeskMark';
import rootReducer from './reducers';
import * as actionCreators from './actions';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

const App = connect(
  state => ({ state }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)(DeskMark);

const scriptElement = document.createElement('script');
scriptElement.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=cQoqZZ4o1Yy96sEiIlIVkkek&services=&t=20170411141812';
scriptElement.type = 'text/javascript';
document.body.appendChild(scriptElement);

function onLoadCallBakFunction() {
  const container = document.body.appendChild(
    document.createElement('div')
  );import React from 'react';
  import { render } from 'react-dom';
  import { bindActionCreators, createStore, applyMiddleware } from 'redux';
  import { connect, Provider } from 'react-redux';
  import thunkMiddleware from 'redux-thunk';

  import 'bootstrap/scss/bootstrap.scss';

  import DeskMark from './components/DeskMark';
  import rootReducer from './reducers';
  import * as actionCreators from './actions';

  const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

  const App = connect(
    state => ({ state }),
    dispatch => ({
      actions: bindActionCreators(actionCreators, dispatch)
    })
  )(DeskMark);

  const scriptElement = document.createElement('script');
  scriptElement.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=cQoqZZ4o1Yy96sEiIlIVkkek&services=&t=20170411141812';
  scriptElement.type = 'text/javascript';
  document.body.appendChild(scriptElement);

  function onLoadCallBakFunction() {
    const container = document.body.appendChild(
      document.createElement('div')
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  }

  scriptElement.onload = onLoadCallBakFunction;


  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  );
}

scriptElement.onload = onLoadCallBakFunction;
