import React, { Component } from 'react';

class Info extends Component {
    
    renderInfo = () => {
        let infoString = []
        let i = 0
        
        for (let key in this.props.info) {
            
            infoString.push(<div key={i} className='info'>{`${key}: ${this.props.info[key]}`}</div>)
            i ++
        }

        return infoString
    }
    
    render() {
        return (
            <div id='hoverInfo'>
                {this.renderInfo()}
            </div>
        );
    }
}

export default Info;
