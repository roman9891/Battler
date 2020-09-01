import React, { Component } from 'react';
import Action from './Action'

class Actions extends Component {
    renderAction = () => this.props.actions.map(action => <Action action={action} appHandler={this.props.appHandler}/>)

    render() {
        return (
            <div id='actions'>
                {this.renderAction()}
            </div>
        );
    }
}

export default Actions;
