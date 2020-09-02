const componentRootSymbol = Symbol('componentRootSymbol');
export class Component {
    constructor() {
        this[componentRootSymbol] = null;
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(component) {
        this.root.appendChild(component.root);
    }
    get root() {
        if (this[componentRootSymbol] === null) {
            this[componentRootSymbol] = this.render().root;
        }
        return this[componentRootSymbol];
    }
    render() {}
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            document.addEventListener(
                RegExp.$1.replace(/^[\s\S]{1}/, (char) => char.toLowerCase()),
                value,
            );
        } else {
            this.root.setAttribute(name, value);
        }
    }
    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(string) {
        this.root = document.createTextNode(string);
    }
    appendChild(node) {
        this.root.appendChild(node.root);
    }
}

export class FakeReact {
    static createElement(type, attrs, ...children) {
        let ele;
        if (typeof type === 'string') {
            // 元素
            ele = new ElementWrapper(type);
        } else {
            // 组件
            ele = new type();
        }
        for (const attrKey in attrs) {
            const attrValue = attrs[attrKey];
            ele.setAttribute(attrKey, attrValue);
        }
        children.forEach((child) => {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            ele.appendChild(child);
        });
        return ele;
    }
}

window.FakeReact = FakeReact;
