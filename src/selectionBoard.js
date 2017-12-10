import React, { Component } from 'react';


class SelectionBoard extends Component {
	
  render() {
  	const selected =  this.props.selected;
	const type = this.props.style;
	const classes = `${selected} ${type}`;
	const tagClasses = `tagName`;

    return (
     <div className={classes} onClick={this.props.action.bind(this, this.props.id, this.props.itemName)}>
		<span className={tagClasses}>{this.props.whoHasPlayed}</span>
     </div>
    );
  }
}

export default SelectionBoard;
