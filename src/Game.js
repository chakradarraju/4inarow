import React, {useState, useEffect} from 'react';
import Board from './Board';
import './Game.css';
import Cell from './Cell';
import checkEnd from './counter';

function Game(params) {
  const N_ROWS = 6;
  const N_COLS = 7;
  const INIT_VALUES = [...Array(N_ROWS)].map(e => new Array(N_COLS).fill('e'));
  const [cells, setCells] = useState(INIT_VALUES);  
  const [currentPlayer, setCurrentPlayer] = useState(params.player1);
  const [gameResult, setGameResult] = useState(null);
  const isNetworkGame = params.player1Local !== params.player2Local;
  const [message, setMessage] = useState('');
  const peerConnected = true;

  useEffect(() => {
    setMessage(gameResult !== null ? gameResult : currentPlayer + ' turn');
  }, [currentPlayer, gameResult]);

  useEffect(() => {
    if (!params.player1Local) params.messenger.on('player1-select', data => select(data.i, data.j));
    if (!params.player2Local) params.messenger.on('player2-select', data => select(data.i, data.j));
    return () => {
      if (!params.player1Local) params.messenger.off('player1-select');
      if (!params.player2Local) params.messenger.off('player2-select');
    }
  }, [currentPlayer]);

  function removeHoverIndicator() {
    const hoverColor = playerColor(currentPlayer) + 'l';
    for (var i = 0; i < N_ROWS; i++) for (var j = 0; j < N_COLS; j++)
      if (cells[i][j] === hoverColor)
        cells[i][j] = 'e';
  }

  function onHover(j) {
    removeHoverIndicator();
    const i = lowestEmptyCell(j);
    if (i < 0) return;
    cells[i][j] = playerColor(currentPlayer) + 'l';
    setCells(cells.slice());
  }

  function lowestEmptyCell(j) {
    var i = N_ROWS - 1;
    while (i >= 0 && cells[i][j] !== 'e') i--;
    return i;
  }

  function onClick(j) {
    removeHoverIndicator();
    const i = lowestEmptyCell(j);
    if (i < 0) {
      console.log('Column does not have empty cell');
      return;
    }
    if (isNetworkGame) params.messenger.send(currentPlayerId() + '-select', {i, j});
    select(i, j);
  }

  function select(i, j) {
    console.log('selecting', i, j);
    cells[i][j] = playerColor(currentPlayer);
    setCells(cells.slice());
    var result = checkEnd(cells);
    if (result !== null) setGameResult(result === 'tie' ? 'tie' : playerName(result) + ' won');
    const nextPlayer = otherPlayer(currentPlayer);
    setCurrentPlayer(nextPlayer);
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

  function isCurrentPlayerLocal() {
    return (currentPlayer === params.player1 && params.player1Local) || (currentPlayer === params.player2 && params.player2Local);
  }

  function currentPlayerId() {
    return currentPlayer === params.player1 ? 'player1' : 'player2';
  }

  function shouldEnableGame() {
    if (gameResult !== null) return false;  // If game has ended, disable
    
    // Game is going on.
    if (!isNetworkGame) return true;  // If it is local game, it is always enabled.
    
    // Network game
    return peerConnected && isCurrentPlayerLocal();
  }

  return (<>
    <div className="users">
      <span className="you"><Cell type='b'/>{params.player1}</span>
      <span className="opponent">{params.player2}<Cell type='r'/></span>
    </div>
    <div className="message">{message}</div>
    <button onClick={params.onExit}>Exit</button>
    <div style={{margin: '30px'}}>
      <Board enable={shouldEnableGame()} cells={cells} onHover={onHover} onClick={onClick} />
    </div>
  </>);
}

export default Game;