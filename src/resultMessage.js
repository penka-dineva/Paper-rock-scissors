import React, { Component } from 'react';
import Button from './button';

class ResultMessage extends Component {


	
  render() {
  const visible =  this.props.msgVisibility;
	const classes = `${visible} msgWrapper`;
  const visibleElement = ( () =>{
    if(this.props.sameResult) {
      return "notVisible"
    }
     return "visible"
    })();
const styles = `${visibleElement}`;   
const stylesElements = `${visibleElement} item`;
    return (

     <div className={classes}>
     <div className="msg">
       <span className={stylesElements}>{this.props.winnersItem}</span>
       <span className={styles}>beats</span>
       <span className={stylesElements}>{this.props.losersItem}</span>
       <div> {this.props.message}</div>
     </div>
      <Button label="play again" playAgain={this.props.playAgain}></Button>
     </div>
    );
  }
}

export default ResultMessage;