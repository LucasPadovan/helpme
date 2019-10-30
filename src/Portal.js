import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const helpmeRoot = document.getElementById('helpme');

export default class Portal extends Component {
    constructor(props) {
        super(props);

        this.el = document.createElement('div');
    }

    componentDidMount() {
        helpmeRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        helpmeRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
