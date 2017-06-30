import React from 'react';
import ReactDOM from 'react-dom';
import Content from './component/Content';

const app = document.createElement('div');
app.setAttribute('id', 'app');
document.body.appendChild(app);
ReactDOM.render(<Content />, app);
