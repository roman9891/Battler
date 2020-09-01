import React, { Component } from 'react';

class Action extends Component {
    clickHandler = () => {
        console.log(this.props.action.name)
        this.props.appHandler(this.props.action)
    }
    
    render() {
        return (
            <button onClick={this.clickHandler}>{this.props.action.name}</button>
        );
    }
}

export default Action;
