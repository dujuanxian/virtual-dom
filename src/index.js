import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createElement} from "./element";

const element = createElement('section', {class: 'header'}, [
  createElement('li', {class: 'item'}, ['Item 1']),
  createElement('li', {class: 'item'}, ['Item 2']),
  createElement('li', {class: 'item'}, ['Item 3'])
]);

console.log(element);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
