import React, { Component } from 'react';
import Action from './Action'

class Actions extends Component {
    state = {
        show: true
    }

    renderAction = () => this.props.actions.map((action, i) => <Action key={i} action={action} appHandler={this.props.appHandler} infoHandler={this.props.infoHandler}/>)

    render() {
        return (
            <div id='actions'>
                {this.props.show ? this.renderAction() : null}
                <button>Camp</button>
            </div>
        );
    }
}

export default Actions;
