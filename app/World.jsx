import React from "react";

export default class World extends React.Component{
    static propTypes = {
        foo: React.PropTypes.string.isRequired
    };

    constructor(props){
        super(props);
        console.log(this.props);
    };

    render() {
        return (
            <div>
                {this.props.foo}
            </div>
        );
    }
};