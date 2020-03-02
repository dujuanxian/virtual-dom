import {ATTR, REMOVE, REPLACE, TEXT} from "./diffType";

let index = 0;

function diffChildren(oldNode, newNode, patches) {
  newNode.children.forEach((node, nodeIndex ) => {
    walk(oldNode.children[nodeIndex], node, patches);
  });
}

function diffAttrs(oldProps, newProps) {
  const attrs = {};
  for (let key in oldProps) {
    if (newProps[key] !== oldProps[key]) {
      attrs[key] = newProps[key];
    }
  }
  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      attrs[key] = newProps[key];
    }
  }
  return attrs;
}

function walk(oldNode, newNode, patches) {
  const current = [];

  if(!newNode) {
    current.push({type: REMOVE, index});
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    current.push({type: TEXT, content: newNode});
  } else if (oldNode.type === newNode.type) {
    const attrs = diffAttrs(oldNode.props, newNode.props);
    current.push({type: ATTR, attrs});
    diffChildren(oldNode, newNode, patches);
  } else {
    current.push({type: REPLACE, node: newNode});
  }

  patches[index++] = current;
}

function diff(oldTree, newTree) {
  const patches = {};
  walk(oldTree, newTree, patches);
  return patches;
}

export default diff;
