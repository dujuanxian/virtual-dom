import * as serviceWorker from './serviceWorker';
import {createElement} from "./element";
import diff from "./diff";
import patch from "./patch";

const element = createElement('section', {class: 'header'}, [
  createElement('p', {class: 'item'}, ['Item 1']),
  createElement('p', {class: 'item'}, ['Item 2']),
  createElement('p', {class: 'item'}, ['Item 3'])
]);

const elementNode = element.render();

const rootElement = document.getElementById('root');
rootElement.appendChild(elementNode);

const newElement = createElement('section', {class: 'new-header'}, [
  createElement('p', {class: 'item'}, ['Item 1']),
  createElement('p', {class: 'item'}, ['Item 2']),
  createElement('p', {class: 'item'}, ['Item 3'])
]);

const patches = diff(element, newElement);
console.log(patches,'=====');

patch(elementNode, patches);

serviceWorker.unregister();
