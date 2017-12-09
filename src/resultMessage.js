import React, { Component } from 'react';
import Button from './button';

class ResultMessage extends Component {


	
  render() {
  	const visible =  this.props.msgVisibility;
	
	const classes = `${visible} msg`;

    return (

     <div className={classes}>
     <div>{this.props.message}</div>
      <Button label="play again" playAgain={this.props.playAgain}></Button>
     </div>
    );
  }
}

export default ResultMessage;