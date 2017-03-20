import React from 'react';
import { render } from 'react-dom';
// import Profile from './Profile';
// import Profile1 from './Profile1';
// import Profile2 from './Profile2';
// import Profile3 from './Profile3';
import Profile4 from './Profile4';

const props = {
  name: 'wind',
  age: 20
};


const App = document.createElement('div');
document.body.appendChild(App);
// render(<Profile {...props} />, App);
// render(<Profile1 {...props} />, App);
// render(<Profile2 {...props} />, App);
// render(<Profile3 {...props} />, App);
render(<Profile4 {...props} />, App);
