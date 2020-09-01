import React from 'react';
import UserInfo from './Components/UserInfo'
import EnemyInfo from './Components/EnemyInfo'
import Actions from './Components/Actions'
import BattleLog from './Components/BattleLog'
import Monsters from './Monsters'
import Users from './Users'
import './App.css';

const monster = Monsters[1]

const user = Users[0]

class App extends React.Component {
  state = {
    turn: 0,
    enemyDamage: 0,
    enemyMitigation: 1,
    enemyEffects: {
      mitigation: 1
    },
    userDamage: 0,
    userEffects: {
      mitigation: 1
    },
    logs: [`You encounter ${monster.name}`]
  }
  
  endTurn = () => {
    this.setState({
      turn: this.state.turn + 1
    })
  }

  appHandler = async (action) => {
    this.userTurn(action)

    
  }

  userTurn = (action) => {
    this.setState({
      userEffects: {...this.state.userEffects, ...action.effect},
      enemyDamage: this.state.enemyDamage + Math.floor(action.power/this.state.enemyEffects.mitigation),
      logs: [`You use ${action.name}!`, ...this.state.logs],
    }, this.checkVictory)
  }

  //apply buffs
  //for each key in buff object
  //this.setState({[key]: this.state[key] + object[key]})
  //buffs = [[buffkey, buffVal, buffTurns]]

  //eot
  //for each item in buffs array
  //thatItem[2] = thatItem[2] - 1
  //if thatItem[2] = 0
  //setState({thatItem[0]: this.state[thatItem0] - thatItem[1]})
  //remove that item from array

  checkVictory = () => {
    if (this.state.enemyDamage >= monster.hp) {
      this.setState({logs: [`${monster.name} dies!`, ...this.state.logs]})
    } else {
      this.enemyTurn()
    }
  }

  enemyTurn = () => {
    const index = (this.state.turn < monster.actions.length) ? this.state.turn : (this.state.turn % monster.actions.length)
    const action = monster.actions[index]

    console.log(index)
    
    this.setState({
      enemyEffects: {...this.state.enemyEffects, ...action.effect},
      userDamage: this.state.userDamage + Math.floor(action.power / this.state.userEffects.mitigation),
      logs: [`${monster.name} ${action.name}!`, ...this.state.logs]
    }, this.checkDefeat)
  }

  checkDefeat = () => {
    if (this.state.userDamage >= user.hp) {
      this.setState({logs: [`${user.name} dies!`, ...this.state.logs]})
    } else {this.endTurn()}
  }
  
  render() {
    console.log(this.state['turn'])
    return (
      <div className="App">
        <EnemyInfo monster={monster} enemyDamage={this.state.enemyDamage}/>
        <UserInfo userDamage={this.state.userDamage}/>
        <Actions actions={user.actions} appHandler={this.appHandler}/>
        <BattleLog logs={this.state.logs}/>
      </div>
    );
  }
}

export default App;
