import React, { Component } from 'react';
import EnemyCard from './EnemyCard';

class EnemyContainer extends Component {
    
    renderEnemies = () => this.props.enemies.map((enemy, i) => {
        // console.log(enemy.id === this.props.currentTarget.id, enemy, enemy.id, this.props.currentTarget.id)
        return <EnemyCard 
            key={enemy.id}
            index={i} 
            enemy={enemy} 
            infoHandler={this.props.infoHandler}
            targeting={this.props.targeting}
            targetHandler={this.props.targetHandler}
            currentTarget={i === this.props.currentTarget.index ? true : false}
            actionEffects={this.props.actionEffects}
        />
    })
    
    render() {
        return (
            <div id='enemy-container'>
                {this.props.enemies.length ? this.renderEnemies() : <div id='victory'>Victory</div>}
            </div>
        );
    }
}

export default EnemyContainer;
