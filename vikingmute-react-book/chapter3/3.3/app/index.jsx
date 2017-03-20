import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <h1>Hello World</h1>
  );
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
