import React from 'react';
import { render } from 'react-dom';
import Profile1 from './Profile1';

const props1 = {
  name: 'qiqi',
  age: 18
};


const App = document.createElement('div');
document.body.appendChild(App);
render(<Profile1 {...props1} />, App);
