import React from 'react';
import UserInfo from './Components/UserInfo'
import EnemyInfo from './Components/EnemyInfo'
import Actions from './Components/Actions'
import BattleLog from './Components/BattleLog'
import './App.css';

const monster = {
  name: `Test Monster`,
  hp: 100,
  pattern: `a`,
  actions: [
    {
      name: `attacks`,
      power: 20,
      effect: {}
    },
    {
      name: `charges up`,
      power: 0,
      effect: {}
    },
    {
      name: `power attacks`,
      power: 50,
      effect: {}
    }
  ],
  image: ``
}

const user = {
  name: `Roman`,
  hp: 100,
  actions: [
    {
      name: `attack`,
      power: 20,
      effect: {
        userMitigation: 1
      }
    },
    {
      name: `block`,
      power: 0,
      effect: {
        userMitigation: 2
      }
    },
    {
      name: `tickle`,
      power: 1,
      effect: {
        userMitigation: 1
      }
    }
  ],
  image: `` 
}

class App extends React.Component {
  state = {
    turn: 0,
    enemyDamage: 0,
    enemyMitigation: 1,
    enemyEffects: {
      userMitigation: 1
    },
    userDamage: 0,
    userEffects: {
      userMitigation: 1
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
      enemyDamage: this.state.enemyDamage + Math.floor(action.power/this.state.enemyEffects.userMitigation),
      logs: [`You use ${action.name}!`, ...this.state.logs],
    }, this.checkVictory)
  }

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
      userDamage: this.state.userDamage + Math.floor(action.power / this.state.userEffects.userMitigation),
      logs: [`${monster.name} ${action.name}!`, ...this.state.logs]
    }, this.checkDefeat)
  }

  checkDefeat = () => {
    if (this.state.userDamage >= user.hp) {
      this.setState({logs: [`${user.name} dies!`, ...this.state.logs]})
    } else {this.endTurn()}
  }
  
  render() {
    console.log(`render`)
    return (
      <div className="App">
        <EnemyInfo enemyDamage={this.state.enemyDamage}/>
        <UserInfo userDamage={this.state.userDamage}/>
        <Actions actions={user.actions} appHandler={this.appHandler}/>
        <BattleLog logs={this.state.logs}/>
      </div>
    );
  }
}

export default App;
