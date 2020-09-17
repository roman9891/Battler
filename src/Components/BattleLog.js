import React, { Component } from 'react';

class BattleLog extends Component {
    renderLogs = () => this.props.logs.map((log, i)=> <p key={i}>{log}</p>)
    
    render() {
        return (
            <div id='log'>
                {this.renderLogs()}
            </div>
        );
    }
}

export default BattleLog;
