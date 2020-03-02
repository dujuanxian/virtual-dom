import {ATTR, REMOVE, REPLACE, TEXT} from "./diffType";

let index = 0;
let currentPatches;

function renderNewNode( element ) {
  let newNode;
  if (element instanceof Element) {
    newNode = element.render();
  } else {
    newNode = document.createTextNode(element);
  }
  return newNode;
}

function walk(node) {
  const currentPatch = currentPatches[index++];

  node.childNodes.forEach(walk);

  if (currentPatch) {
    doPatch(node, currentPatch);
  }
}

function doPatch(node, patches) {
  switch (patches[index]) {
    case REMOVE:
      node.parentNode.removeChild(node);
      break;
    case REPLACE:
      const newNode = renderNewNode(patches[index].node);
      node.parentNode.replaceChild(newNode);
      break;
    case TEXT:
      node.textContent = patches[index].content;
      break;
    case ATTR:
      const attrs = patches[index].attrs;
      for (let key in attrs) {
        node.setAttribute(key, attrs[key]);
      }
      break;
    default:
      break;
  }
}

function patch(tree, patches) {
  currentPatches = patches;
  walk(tree);
}

export default patch;
