import React, { Component } from 'react';

class EnemyCard extends Component {
    state = {
        ...this.props.enemy,
        damage: 0,
        index: this.props.index
    }

    hoverHandler = () => {
        this.props.infoHandler({
            Name: this.state.name,
            Info: this.state.info
        })
    }

    clickHandler = () => {
        if (this.props.targeting) {
            this.props.targetHandler(this.state)
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.actionEffects !== prevProps.actionEffects) && this.props.currentTarget) {
            console.log('actionEffects', this.props.actionEffects)
            this.setState({damage: this.state.damage + this.props.actionEffects.damage})
        } 
    }

    render() {

        const hp = {width: `${((this.state.hp - this.state.damage) / this.state.hp)*100}%`}
        const nrg = {width: `${((this.state.energy) / this.state.energy)*100}%`}
        const targeting = {border: '3px solid orange', cursor: 'pointer'}
        const currentTarget = {backgroundColor: 'tomato'}

        return (
            <div className='enemy-card' onClick={this.clickHandler} onMouseEnter={this.hoverHandler} style={this.props.currentTarget ? currentTarget : null} style={this.props.targeting ? targeting : null}>
                <div className='enemy-div'>
                    <img className='enemy-image' src={this.state.image} alt=''></img>
                    <div className='enemy-stats'>
                        <p>{this.state.name}</p>
                        <div className='hp' style={hp}></div>
                        <div className='energy-bar' style={nrg}></div>
                    </div>
                    {this.props.currentTarget ? <p>Targeted</p> : null}
                </div>
                
            </div>
        );
    }
}

export default EnemyCard;
