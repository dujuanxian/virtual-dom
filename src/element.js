class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }

  render () {
    const node = document.createElement(this.tagName);

    for (let key in this.props) {
      //TODO: not considering special type of attribute, i.e. input value, style
      node.setAttribute(key, this.props[key]);
    }

    this.children.forEach(child => {
      const childNode = Element._renderChild(child);
      node.appendChild(childNode);
    });

    return node;
  }

  static _renderChild (child) {
    if (child instanceof Element) {
      return child.render();
    } else {
      return document.createTextNode(child);
    }
  }
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

export {
  Element,
  createElement
}
