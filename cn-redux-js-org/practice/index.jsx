import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';

const app = document.createElement('div');
app.setAttribute('id', 'wrapper');
document.body.appendChild(app);
ReactDOM.render(<Content />, app);
