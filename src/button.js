import React, { Component } from 'react';

class Button extends Component {
	constructor (props) {
		super(props)

	}


	
  render() {
  
    return (
     <div className='btn' onClick={this.props.playAgain.bind(this)}>{this.props.label}</div>
    );
  }
}

export default Button;