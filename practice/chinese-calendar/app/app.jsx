/**
 * @file:
 * Created by wind on 17/5/20.
 * @todo:
 */

import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/scss/bootstrap.scss';

import Table from './components/Table';


const element = document.createElement('div');
element.setAttribute('class', 'container');
const container = document.body.appendChild(element);

render(<Table />, container);
