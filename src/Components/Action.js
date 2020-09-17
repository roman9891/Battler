import React, { Component } from 'react';

class Action extends Component {
    clickHandler = () => {
        // console.log(this.props.action.name)
        this.props.appHandler(this.props.action)
    }

    hoverHandler = () => {
        // console.log(`hi`)
        this.props.infoHandler({
            name: this.props.action.name,
            info: this.props.action.info
        })
    }
    
    render() {
        return (
            <button 
            onClick={this.clickHandler}
            onMouseEnter={this.hoverHandler}>{this.props.action.name}</button>
        );
    }
}

export default Action;
