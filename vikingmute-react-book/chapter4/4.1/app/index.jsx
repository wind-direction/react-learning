import 'babel-polyfill';
import 'bootstrap/less/bootstrap.less';

import React from 'react';
import ReactDOM from 'react-dom';
import DeskMark from '../components/DeskMark';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<DeskMark />, app);
