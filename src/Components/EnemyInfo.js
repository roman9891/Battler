import React, { Component } from 'react';

class EnemyInfo extends Component {
    state = {
        name: this.props.monster.name,
        hp: 100
    }

    render() {
        return (
            <div id='enemy'>
                <img id="enemy-image" src={this.props.monster.image}></img>
                <div id="enemy-stats">
                    <p>{this.state.name}</p>
                    <p>{this.state.hp - this.props.enemyDamage}/100</p>
                </div>
            </div>
        );
    }
}

export default EnemyInfo;
