import React, {Component} from 'react';
import ReactDom from 'react-dom';

export class Option extends React.Component {
    render() {
        console.log(this.props.filter);
        return (
            <option>{this.props.children}</option>
        )
    }
};
