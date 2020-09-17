import React, { Component } from 'react';

class UserInfo extends Component {
    state = {
        ...this.props.user,
        buff: true,
        stance: false,
        poison: true,
        bleed: true,
        frost: true,
        shock: true,
        burn: true
    }

    hoverHandler = () => {
        // console.log(`hi`)
        this.props.infoHandler({
            target: `user`,
            hp: this.state.hp,
            energy: this.state.energy
        })
    }
    
    render() {

        const hp = {width: `${((this.props.user.hp - this.props.userDamage) / this.props.user.hp)*100}%`}
        const nrg = {width: `${((this.state.energy - this.props.userCost) / this.state.maxEnergy)*100}%`}

        return (
            <div id='user' onMouseEnter={this.hoverHandler}>
                <img id='user-image' src={this.props.user.image} alt=''></img>
                <div id='user-stats'>
                    <p>{this.state.name}</p>
                    <div className='status-icon-row'>
                        {
                            this.state.buff ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704129/FLeTg_9FpQH1fgdfLMAZVQ/max.png?1549904712' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.stance ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704101/2rL9lgTILWe1SQ9bFmXCFg/max.png?1549904613' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.poison ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704285/jqGZM8o2_P0B_d-TOomfTw/max.png?1549905232' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.bleed ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704105/P2SRIiKh2kt_WOi84hfg6w/max.png?1549904631' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.frost ? 
                            <img className='status-icon' src='https://previews.123rf.com/images/designtools/designtools1811/designtools181100332/111084411-frost-snowflake-icon-with-fast-speed-effect-vector-illustration-designed-for-modern-abstraction-with.jpg' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.shock ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704361/8CUbfXJ_dTjOGOjSJRE0wg/max.png?1549905512' alt=''></img>
                                :
                            null
                        }
                        {
                            this.state.burn ? 
                            <img className='status-icon' src='https://s3.amazonaws.com/files.d20.io/marketplace/704141/B8y78zKo2qVpFEv5B25LRA/max.png?1549904754' alt=''></img>
                                :
                            null
                        }
                    </div>
                    {/* <p>HP:{this.state.hp - this.props.userDamage}/100</p> */}
                    <div className='hp' style={hp}></div>
                    {/* <p>Energy:{this.state.energy}/{this.state.energy}</p> */}
                    <div className='energy-bar' style={nrg}></div>
                </div>
            </div>
        );
    }
}

export default UserInfo;
