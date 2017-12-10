import React, { Component } from 'react';
import SelectionBoard from './selectionBoard';
import ResultMessage from './resultMessage';

class GameArea extends Component {
	constructor (props) {
    super(props);

    this.state = {
		      playersChoice: null,
		      computersChoice: null,
		      idItemPlayer: null,
		      idItemComputer: null,
		      winnersItem: null,
		      losersItem: null,
		      gameResult: undefined,
		      playersChoseTheSame: false,
		      resultMessage: '',
		      messageIsVsible: 'msgInvisible',
		      options: 
		      [
			      {
				       name:'rock',
				       style:'rock',
				       isSelected: null,
				       whoHasPlayed: null,
				       id: 0
			      },
			      {
				       name:'papepr',
				       style:'paper',
				       isSelected: null,
				       whoHasPlayed: null,
				       id: 1
			      },
			      {
				      name:'scissors',
				      style:'scissors',
				      isSelected: null,
				      whoHasPlayed: null,
				      id: 2
			      }
		      ],
		    }

	this.playerSelectsItem = this.playerSelectsItem.bind(this);
	this.computerMakesMove = this.computerMakesMove.bind(this);
	this.getGameResult = this.getGameResult.bind(this);
	this.playGame = this.playGame.bind(this);
	this.handleSelectedElement = this.handleSelectedElement.bind(this);
	this.handleSelectedElementLabel = this.handleSelectedElementLabel.bind(this);
	this.playAgain = this.playAgain.bind(this);
}



playGame (id, itemName) {
console.log(id, itemName)
	if (id === undefined) {
			return;
	} 

	this.playerSelectsItem(id, itemName);
	this.computerMakesMove ();
}


playerSelectsItem (id, itemName) {
	console.log(id, itemName)

	if(this.state.idItemPlayer === null) {
      this.setState({
      idItemPlayer:  id
    }, () => this.getGameResult())
     
      this.setState({
      playersChoice: itemName
    })
      return;
    };
    
   this.setState({
      idItemPlayer:  id
    }, () => this.getGameResult())
     
      this.setState({
      playersChoice: itemName
    })
}

computerMakesMove (id) {
	let choise = Math.random();

	if (choise <= 0.33) {
		choise = 'rock';
		 this.setState({
      		computersChoice: choise
    	});
		this.setState({
      idItemComputer:  0
    })
		return;
	}
	if (choise > 0.33 && choise <= 0.66) {
		choise = 'paper';
		 this.setState({
      		computersChoice: choise
    	});
		 this.setState({
      idItemComputer: 1
    })

		return;
	}

	choise = 'scissors';
	this.setState({
      computersChoice: choise
    });
    this.setState({
      idItemComputer: 2
    })
}

getGameResult (item) {
	let computersChoice = this.state.computersChoice;
	let playersChoice =  this.state.playersChoice;
	let player = 'your choise';
	let computer = 'computer chose' ;
	let selectedFirst = 'selectedFirst';
	let selectedSecond = 'selectedSecond';
	let selectedItemPlayer =this.state.idItemPlayer;
	let selectedItemComputer =this.state.idItemComputer;

    this.setState({
  		messageIsVsible: 'msgVisible'
	})

	if (this.state.idItemPlayer === this.state.idItemComputer) {
		this.setState({
      		resultMessage: 'You both picked the same items',
      		playersChoseTheSame: true
    	})
		return
	}

	if((playersChoice === 'paper' && computersChoice === 'rock')
		 || (playersChoice === 'scissors' && computersChoice === 'paper')
		 || (playersChoice === 'rock' && computersChoice === 'scissors')) {

		this.setState({
  		resultMessage: 'Congratulations you win!',
  		winnersItem: this.state.playersChoice,
  		losersItem: this.state.computersChoice
    	}, ()=>console.log(this.state.winnersItem, this.state.losersItem))
		
    	
    	this.handleSelectedElement(selectedItemPlayer, playersChoice, player, selectedFirst)
    	this.handleSelectedElement(selectedItemComputer, computersChoice, computer, selectedSecond)
    	return
	}
	
	
	this.setState({
		resultMessage: 'Sorry, computer wins',
		winnersItem: this.state.playersChoice,
  		losersItem: this.state.computersChoice
    	}, ()=>console.log(this.state.winnersItem, this.state.losersItem))
    	
	this.handleSelectedElement(selectedItemPlayer, playersChoice, player, selectedFirst)
    this.handleSelectedElement(selectedItemComputer, computersChoice, computer, selectedSecond)
}

handleSelectedElement (selectedItem, choice, gamer, status) {
	let idSelected = selectedItem;
	console.log(selectedItem, choice, gamer, status)
	let selectedStyle = {...this.state.options};

	selectedStyle[idSelected].isSelected = status;

	this.setState({
     selectedStyle
    }, () => this.handleSelectedElementLabel(idSelected, gamer))
}

handleSelectedElementLabel (selectedItem, gamer) {
	let idSelected = selectedItem;
	let selectedStyle = {...this.state.options};

	selectedStyle[idSelected].whoHasPlayed = gamer;

	this.setState({
     selectedStyle
    })
}

playAgain() {
	window.location.reload(false);
}

  render() {
    return (
     <div className={this.props.areaStyle}>
    <h1 className="title">Click an Image to Play</h1>
	<ResultMessage message={this.state.resultMessage} msgVisibility={this.state.messageIsVsible}
	 playAgain={this.playAgain} winnersItem={this.state.winnersItem} losersItem={this.state.losersItem} sameResult={this.state.playersChoseTheSame}></ResultMessage>
        <SelectionBoard style={this.state.options[0].style} selected={this.state.options[0].isSelected}
        id={this.state.options[0].id} itemName={this.state.options[0].name} action={this.playGame} whoHasPlayed={this.state.options[0].whoHasPlayed}/>
         <SelectionBoard style={this.state.options[1].style} selected={this.state.options[1].isSelected}
          id={this.state.options[1].id} itemName={this.state.options[1].name}action={this.playGame} whoHasPlayed={this.state.options[1].whoHasPlayed}/>
          <SelectionBoard style={this.state.options[2].style} selected={this.state.options[2].isSelected}
 id={this.state.options[2].id} itemName={this.state.options[0].name} action={this.playGame} whoHasPlayed={this.state.options[2].whoHasPlayed}/>
 
     </div>
    );
  }
}

export default GameArea;