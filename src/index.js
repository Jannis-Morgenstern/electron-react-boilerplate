import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

render(<App />, document.getElementById('root'));

serviceWorker.register();
