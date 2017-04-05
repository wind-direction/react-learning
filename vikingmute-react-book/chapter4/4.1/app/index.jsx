import 'babel-polyfill';
import 'bootstrap/less/bootstrap.less';

import React from 'react';
import ReactDOM from 'react-dom';
import DeskMark from '../components/DeskMark';

import './index.scss';

const app = document.createElement('div');
app.setAttribute('id', 'wrapper');
document.body.appendChild(app);
ReactDOM.render(<DeskMark />, app);
