import React, { Component } from 'react';

class BattleLog extends Component {
    renderLogs = () => this.props.logs.map(log => <p>{log}</p>)
    
    render() {
        return (
            <div id='log'>
                {this.renderLogs()}
            </div>
        );
    }
}

export default BattleLog;
