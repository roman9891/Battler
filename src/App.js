import React from 'react';
import UserInfo from './Components/UserInfo'
// import EnemyInfo from './Components/EnemyInfo'
import Actions from './Components/Actions'
import BattleLog from './Components/BattleLog'
import Monsters from './Monsters'
import Users from './Users'
import Info from './Components/Info'
import EnemyContainer from './Components/EnemyContainer'
import './App.css';

const monster = Monsters[1]

const user = Users[0]

class App extends React.Component {
  //add monsters as array of objects recieved from "floor"
  //objects get passed in as parameter to the turn function
  state = {
    enemies: [Monsters[1], Monsters[1]],
    users: [user[0], user[0]],
    turn: 0,
    enemyDamage: 0,
    enemyDamageReduction: 1,
    enemyPowerIncrease: 1,
    // enemyMitigation: 1,
    // enemyEffects: {
    //   mitigation: 1
    // },
    userDamage: 0,
    userCost: 0,
    userDamageReduction: 1,
    userPowerIncrease: 1,
    // userEffects: {
    //   mitigation: 1
    // },
    logs: [`You encounter ${monster.name}`],
    show: true,
    info: ``,
    currentAction: {},
    currentTarget: {},
    actionEffects: {}
  }

  appHandler = (action) => {
    //this.userTurn(action)

    if ((user.energy - this.state.userCost) >= action.cost)
    //  reduce nrg by cost
      this.setState({
        currentAction: action,
        userCost: this.state.userCost + action.cost, 
        show: false
      }, () => this.chooseTarget(action.target))
    else {
      this.setState({logs: [`Not enough energy for ${action.name}!`, ...this.state.logs]})
    }
  }  

  chooseTarget = (targetType) => {
    if (targetType === 'single enemy') {
      this.setState({targeting: 'enemy'}, () => console.log(this.state))
    }
    if (targetType === 'self') {
      this.userTurn(this.state.currentAction)
    }
  }
  
  targetHandler = (target) => {
    this.setState({currentTarget: target, targeting: null}, () => this.actionOnTarget(this.state.currentAction, target))
  }

  actionOnTarget = (action, target) => {
    const incomingDamage = action.power * this.state.userPowerIncrease
    console.log('actions',action,target)
    if ((incomingDamage + target.damage) > target.hp) {
      this.setState({enemies: [...this.state.enemies.slice(0,target.index),...this.state.enemies.slice(target.index + 1)]}, () => setTimeout(this.checkVictory, 1000))
    } else {
      this.setState({actionEffects: {damage: action.power * this.state.userPowerIncrease}}, () => setTimeout(this.checkVictory, 1000))
    } 
  }

  userTurn = (action) => {
    this.setState({
      logs: [`You use ${action.name}!`, ...this.state.logs],
      show: false
    }, () => {
      if (action.beforeEffect) {
        action.beforeEffect.forEach(effectArray => {
          this.setState({[effectArray[0]]: this.state[effectArray[0]] * effectArray[1]}, () => console.log(this.state))
        })
      }
      if (action.power) {
        this.setState({
          enemyDamage: this.state.enemyDamage + Math.floor(action.power * this.state.userPowerIncrease / this.state.enemyDamageReduction)
        })
      }
      if (action.afterEffect) {
        console.log(action.afterEffect)
      }
    })

    setTimeout(this.checkVictory, 1000)
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
    } 
    else if (this.state.enemies.length === 0) {
      this.setState({logs: [`Victory!`, ...this.state.logs]})
    }
    else {
      this.enemiesTurn()
    }
  }

  enemiesTurn = () => {
    this.state.enemies.forEach(enemy => this.enemyTurn(enemy))

    setTimeout(this.checkDefeat, 500)
  }

  enemyTurn = (enemy) => {
    const index = (this.state.turn < enemy.actions.length) ? this.state.turn : (this.state.turn % enemy.actions.length)
    const action = enemy.actions[index]
    
    this.setState({logs: [`${enemy.name} ${action.name}!`, ...this.state.logs]}, () => {
      if (action.beforeEffect) {
        action.beforeEffect.forEach(effectArray => {
          this.setState({[effectArray[0]]: this.state[effectArray[0]] * effectArray[1]}, () => console.log(this.state))
        })
      }
      if (action.power) {
        this.setState({
          userDamage: this.state.userDamage + Math.floor((action.power * this.state.enemyPowerIncrease)/ this.state.userDamageReduction)
        })
      }
      if (action.afterEffect) {
        console.log(action.afterEffect)
      }
    })

    setTimeout(() => console.log(enemy.name),500)
    
    // this.setState({
    //   enemyEffects: {...this.state.enemyEffects, ...action.effect},
    //   userDamage: this.state.userDamage + Math.floor(action.power / this.state.userDamageReduction),
    //   logs: [`${monster.name} ${action.name}!`, ...this.state.logs]
    // }, this.checkDefeat)
  }

  checkDefeat = () => {
    if (this.state.userDamage >= user.hp) {
      this.setState({logs: [`${user.name} dies!`, ...this.state.logs]})
    } else {this.endTurn()}
  }

  endTurn = () => {
    this.setState({
      turn: this.state.turn + 1,
      userCost: (this.state.userCost - 20) < 0 ? 0 : (this.state.userCost - 20),
      show: true
    })
    //for each item in state.durations
    //duration - 1
    //if duration = 0
    //  state[key] = - value
    //  remove duration
  }

  infoHandler = (info) => {
    this.setState({info: info})
  }
  
  render() {
    return (
      <div className="App">
        <div id="battle-container">
          {/* <EnemyInfo infoHandler={this.infoHandler} enemy={monster} enemyDamage={this.state.enemyDamage}/> */}
          <EnemyContainer 
            infoHandler={this.infoHandler} 
            enemies={this.state.enemies}
            targeting={(this.state.targeting === 'enemy') ? true : false}
            targetHandler={this.targetHandler}
            currentTarget={this.state.currentTarget}
            actionEffects={this.state.actionEffects}
          />
          <UserInfo infoHandler={this.infoHandler} user={user} userDamage={this.state.userDamage} userCost={this.state.userCost}/>
          <Actions infoHandler={this.infoHandler} show={this.state.show} actions={user.actions} appHandler={this.appHandler}/>
          <BattleLog logs={this.state.logs}/>
        </div>
        
        <Info info={this.state.info}/>
      </div>
    );
  }
}

export default App;
