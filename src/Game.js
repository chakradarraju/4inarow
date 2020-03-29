import React, {useState} from 'react';
import Board from './Board';
import './Game.css';
import Cell from './Cell';
import checkEnd from './counter';

function Game(params) {
  const N_ROWS = 7;
  const N_COLS = 7;
  const INIT_VALUES = [...Array(N_ROWS)].map(e => new Array(N_COLS).fill('e'));
  const [cells, setCells] = useState(INIT_VALUES);  
  const [currentPlayer, setCurrentPlayer] = useState(params.player1);
  const [currentPlayerColor, setCurrentPlayerColor] = useState(playerColor(params.player1));
  const [gameOver, setGameOver] = useState(false);
  function removeHoverIndicator() {
    const hoverColor = currentPlayerColor + 'l';
    for (var i = 0; i < N_ROWS; i++) for (var j = 0; j < N_COLS; j++)
      if (cells[i][j] === hoverColor)
        cells[i][j] = 'e';
  }
  function onHover(j) {
    removeHoverIndicator();
    const i = lowestEmptyCell(j);
    if (i < 0) return;
    cells[i][j] = currentPlayerColor + 'l';
    setCells(cells.slice());
  }

  function lowestEmptyCell(j) {
    var i = N_ROWS - 1;
    while (cells[i][j] !== 'e' && i > 0) i--;
    return i;
  }

  function onClick(j) {
    removeHoverIndicator();
    const i = lowestEmptyCell(j);
    if (i < 0) {
      console.log('Column does not have empty cell');
      return;
    }
    cells[i][j] = currentPlayerColor;
    setCells(cells.slice());
    var result = checkEnd(cells);
    if (result !== null) {
      if (result !== 'tie') result = playerName(result) + ' won';
      alert(result);
      setGameOver(true);
    }
    const nextPlayer = otherPlayer(currentPlayer);
    setCurrentPlayer(nextPlayer);
    setCurrentPlayerColor(playerColor(nextPlayer));
  }

  function otherPlayer(player) {
    return player === params.player1 ? params.player2 : params.player1;
  }

  function playerColor(player) {
    return player === params.player1 ? 'b' : 'r';
  }

  function playerName(color) {
    return color === 'b' ? params.player1 : params.player2;
  }

  return (<>
    <div className="users">
      <span className="you"><Cell type='b'/>{params.player1}</span>
      <span className="opponent">{params.player2}<Cell type='r'/></span>
    </div>
    <div className="message">{currentPlayer} turn</div>
    <button onClick={params.onExit}>Exit</button>
    <div style={{margin: '30px'}}>
      <Board enable={!gameOver} cells={cells} onHover={onHover} onClick={onClick} />
    </div>
  </>);
}

export default Game;