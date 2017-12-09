import React, { Component } from 'react';
import SelectionBoard from './selectionBoard';

import ResultMessage from './resultMessage';

class GameArea extends Component {
	constructor (props) {
    super(props);

    this.state = {
		      playersChoice: 0,
		      computersChoice: 0,
		      gameResult: undefined,
		      playersChoseTheSame: false,
		      resultMessage: '',
		      messageIsVsible: 'msgInvisible',
		      options: 
		      [{},
			      {
				       name:'rock',
				       style:'rock',
				       value: 1,
				       isSelected: null,
				       whoHasPlayed: null
			      },
			      {
				       name:'papepr',
				       style:'paper',
				       value: 2,
				       isSelected: null,
				       whoHasPlayed: null
			      },
			      {
				      name:'scissors',
				      style:'scissors',
				      value: 3,
				      isSelected: null,
				      whoHasPlayed: null
			      }
		      ],
		    game: 
			    {
					cta: 'Click an image to play',
					message: 'you chose'
			    }
    }

this.playerSelectsItem = this.playerSelectsItem.bind(this);
this.computerMakesMove = this.computerMakesMove.bind(this);
this.getGameResult = this.getGameResult.bind(this);
this.playGame = this.playGame.bind(this);
this.handleSelectedElement = this.handleSelectedElement.bind(this);
this.handleSelectedElementLabel = this.handleSelectedElementLabel.bind(this);
this.playAgain = this.playAgain.bind(this);
}



playGame (item) {

	if (item === undefined) {
			return;
	} 

	this.playerSelectsItem(item);
	this.computerMakesMove ();

}


playerSelectsItem (item) {
	let selectedItem = item;

	if(this.state.playersChoice === 0) {
      this.setState({
      playersChoice:  selectedItem
    }, () => this.getGameResult(selectedItem))
      return;
    };
    
    if(this.state.playersChoice !== 0) {
    	 this.setState({
      playersChoice:  selectedItem
    }, () => this.getGameResult( selectedItem))
      return;
    };
}

computerMakesMove () {
	let choise = Math.random();

	if (choise <= 0.33) {
		choise = 1;
		 this.setState({
      		computersChoice: choise
    	});

		return;
	}
	if (choise > 0.33 && choise <= 0.66) {
		choise = 2;
		 this.setState({
      		computersChoice: choise
    	});

		return;
	}

	choise = 3;
	this.setState({
      computersChoice: choise
    });
}

getGameResult (item) {
	let dd = item
	let computersChoice = this.state.computersChoice;
	let playersChoice =  this.state.playersChoice;
	console.log('Player', playersChoice, 'PC', computersChoice )
	let player = 'your choise';
	let computer = 'computer chose' ;
    this.setState({
      		messageIsVsible: 'msgVisible'
    	})

	if (this.state.playersChoice == this.state.computersChoice) {
		this.setState({
      		resultMessage: 'You both picked the same items'
    	})
		return
		//this.playAgain();
	}

	if(playersChoice == 1 && computersChoice == 2) {
			this.setState({
      		resultMessage: 'Paper beats Rock - Sorry, computer wins'
    	})
	}
	if(playersChoice == 2 && computersChoice == 1) {
			this.setState({
      		resultMessage: 'Paper beats Rock - Congratulations you win!'
    	})
	}
	if(playersChoice == 3 && computersChoice == 2) {
			this.setState({
      		resultMessage: 'Scissors beats Paper - Congratulations you win!'
    	})
	}
	if(playersChoice == 2 && computersChoice == 3) {
			this.setState({
      		resultMessage: 'Scissors beats Paper - Sorry, computer wins'
    	})
	}
	if(playersChoice == 1 && computersChoice == 3) {
			this.setState({
      		resultMessage: 'Rock beats Scissors - Congratulations you win!'
    	})
	}
	if(playersChoice == 3 && computersChoice == 1) {
			this.setState({
      		resultMessage: 'Rock beats Scissors - Sorry, computer wins'
    	})
	}

	this.handleSelectedElement(playersChoice, player)
     this.handleSelectedElement(computersChoice, computer)
    
    
}

handleSelectedElement (selectedItem, gamer) {
	let idSelected = selectedItem;
	console.log(idSelected)
	let selectedStyle = {...this.state.options};

	selectedStyle[idSelected].isSelected = 'selected';

	this.setState({
	     selectedStyle
	    }, () => this.handleSelectedElementLabel(idSelected, gamer))
	     console.log('selected state is..', this.state.options)
}

handleSelectedElementLabel (selectedItem, gamer) {
	let idSelected = selectedItem;
	console.log(idSelected, gamer)
	let selectedStyle = {...this.state.options};

	selectedStyle[idSelected].whoHasPlayed = gamer;

	this.setState({
	     selectedStyle
	    })
	     console.log('selected state is..', this.state.options)
}

playAgain() {
	window.location.reload(false);
}
  render() {
    return (
     <div className={this.props.areaStyle}>
    <h1>{this.state.game.cta}</h1>
	<ResultMessage message={this.state.resultMessage} msgVisibility={this.state.messageIsVsible} playAgain={this.playAgain}></ResultMessage>
        <SelectionBoard style={this.state.options[1].style} selected={this.state.options[1].isSelected}
        in={this.state.options[1].value} action={this.playGame} whoHasPlayed={this.state.options[1].whoHasPlayed}/>
         <SelectionBoard style={this.state.options[2].style} selected={this.state.options[2].isSelected}
          in={this.state.options[2].value} action={this.playGame} whoHasPlayed={this.state.options[2].whoHasPlayed}/>
          <SelectionBoard style={this.state.options[3].style} selected={this.state.options[3].isSelected}
 in={this.state.options[3].value} action={this.playGame} whoHasPlayed={this.state.options[3].whoHasPlayed}/>
 
     </div>
    );
  }
}

export default GameArea;