import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/less/bootstrap.less';
import './app.scss';

import DashBoard from './components/dashBoard';


const element = document.createElement('div');
element.setAttribute('id', 'wrapper');
const container = document.body.appendChild(element);

render(<DashBoard />, container);
