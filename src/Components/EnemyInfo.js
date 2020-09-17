import React, { Component } from 'react';

class EnemyInfo extends Component {
    state = {...this.props.enemy}

    hoverHandler = () => {
        console.log(`hi`)
        this.props.infoHandler({
            test: `test`,
            dummy: `data`,
            target: `Enemy`
        })
    }

    render() {
        const styleObj = {width: `${((this.props.enemy.hp - this.props.enemyDamage) / this.props.enemy.hp)*100}%`}

        return (
            <div id='enemy' onMouseEnter={this.hoverHandler}>
                <img id="enemy-image" src={this.props.enemy.image} alt=''></img>
                <div id="enemy-stats">
                    <p>{this.state.name}</p>
                    <p>{(this.props.enemy.hp - this.props.enemyDamage)} / {this.props.enemy.hp}</p>
                    <div id='enemy-hp' style={styleObj}></div>
                </div>
            </div>
        );
    }
}

export default EnemyInfo;
