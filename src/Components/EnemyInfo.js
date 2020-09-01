import React, { Component } from 'react';

class EnemyInfo extends Component {
    state = {
        name: `Monster`,
        hp: 100
    }

    render() {
        return (
            <div id='enemy'>
                <p>{this.state.name}</p>
                <p>{this.state.hp - this.props.enemyDamage}/100</p>
            </div>
        );
    }
}

export default EnemyInfo;
