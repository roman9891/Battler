import React, { Component } from 'react';

class UserInfo extends Component {
    state = {
        name: `Roman`,
        hp: 100
    }
    
    render() {
        return (
            <div id='user'>
                <p>{this.state.name}</p>
                <p>{this.state.hp - this.props.userDamage}/100</p>
            </div>
        );
    }
}

export default UserInfo;
