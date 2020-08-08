import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {
//  render() {
//    return (
//      //<!--button className="square" onClick={function() {alert('click')}}-->
//      //<!--dont do this: onClick={alert('click')}-->
//      <button className="square" onClick={() => this.props.onClick()}>
//        {this.props.value}
//      </button>
//    );
//  }
//}

//Function companent for Square class, now Square class has no construction
//which it is a function component, no need to use it as a class anymore
function Square(props){
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    };
  }

  handleClick(i){
    if(this.state.winner){
      return;
    }

    //Use a copy of the list to avoid mutation
    //1. Avoiding direct data mutation lets us keep previous versions
    //of the game’s history intact, and reuse them later
    //2. Detecting Changes: just compare the reference we will now data
    //Has been changed, instead before which need to have a existing object
    //to compare, this is important for React ROM to update components
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]}
    onClick={() => this.handleClick(i)}/>;
  }

  render() {
    this.state.winner = calculateWinner(this.state.squares);
    let status;
    if(this.state.winner){
      status = 'Winner: ' + this.state.winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
  const winnningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

  for(let i = 0; i < winnningPattern.length; i++){
    const[a, b, c] = winnningPattern[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
