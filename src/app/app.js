/**
 * File : app.js
 * Todo :
 * Created by wind on 17/2/27.
 */
import React, { Component } from 'react';
import { Render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import reducers from 'reducers/index';
