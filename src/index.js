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

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}/>;
  }

  render() {

    return (
      <div>
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
  constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext : true,
        winner: null,
        stepNumber: 0,
      };
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i){


    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history [history.length - 1];

    if(this.state.winner){
      return;
    }

    //Use a copy of the list to avoid mutation
    //1. Avoiding direct data mutation lets us keep previous versions
    //of the game’s history intact, and reuse them later
    //2. Detecting Changes: just compare the reference we will now data
    //Has been changed, instead before which need to have a existing object
    //to compare, this is important for React ROM to update components
    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        squares : squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    this.state.winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (this.state.winner){
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
