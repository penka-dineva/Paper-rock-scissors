import React, { Component } from 'react';


class SelectionBoard extends Component {
	
  render() {
  	const selected =  this.props.selected;
	const type = this.props.style;
	const classes = `${selected} ${type}`;
    return (
     <div className={classes} onClick={this.props.action.bind(this, this.props.in)}>{this.props.whoHasPlayed}</div>
    );
  }
}

export default SelectionBoard;
