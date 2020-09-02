import { Component } from './fakeReact';

class VButton extends Component {
    constructor() {
        super();
    }

    render() {
        return <div onClick={this.add} class='v-button'></div>;
    }

    add() {
        console.log('add');
    }
}

class VIcon extends Component {
    constructor() {
        super();
    }

    render() {
        return <span class='v-icon'>icon</span>;
    }
}

const vButton = (
    <VButton data-user='jelf'>
        <VIcon id='icon' />
    </VButton>
);

render(vButton, document.body);

function render(component, container) {
    container.appendChild(component.root);
}
