import React, { useEffect } from 'react';
import Board from './Board';
import './Game.css';
import Cell from './Cell';
import { NO_RESULT, TIE, PLAYER1_WON, PLAYER2_WON } from './counter';
import {connect} from 'react-redux';
import {playerColor, otherPlayer} from './common';
import * as actions from './actions';

function Game(params) {
  const player1Local = !params.hostId;

  useEffect(() => {
    for (var message of params.inMessages) if (!message.ack) {
      if (message.msg === 'select') {
        select(message.data);
      } else if (message.msg === 'quit-game') {
        alert(otherPlayer(params) + ' has quit game');
        params.setupNewGame();
      }
      params.ackMessage(message);
    }
  }, [params.inMessages]);

  function onHover(j) {
    params.highlight(j, playerColor(params.player1Turn))
  }

  function onClick(j) {
    if (params.networkGame) params.sendMessage('select', j);
    select(j);
  }

  function select(j) {
    params.addPiece(j, playerColor(params.player1Turn));
    params.checkEnd(params.cells);
    if (params.gameResult === 0) params.togglePlayer();
  }

  function shouldEnableBoard() {
    if (params.gameResult === NO_RESULT) {  // Game going on.
      if (params.networkGame) {  // Make sure peer is connected, and it is your turn.
        return params.peerConnected && (player1Local === params.player1Turn);
      } else {  // Local game, no need to disable board.
        return true;
      }
    } else {  // Game over, disable board.
      return false;
    }
  }

  function player1Reference() {
    return params.networkGame && player1Local ? 'You' : params.player1Name;
  }

  function player2Reference() {
    return params.networkGame && !player1Local ? 'You' : params.player2Name;
  }

  function possessiveForm(noun) {
    return noun === 'You' ? 'Your' : (noun + "'s")
  }

  function message() {
    if (params.gameResult === TIE) return 'Tie';
    if (params.gameResult === PLAYER1_WON) return player1Reference() + ' won';
    if (params.gameResult === PLAYER2_WON) return player2Reference() + ' won';
    if (params.networkGame) {
      if (!params.serverConnected) return "You're not connected to server, check internet";
      if (!params.peerConnected) return otherPlayer(params) + ' disconnected';
      if (params.peerConnected && params.peerGameId !== params.gameId) return otherPlayer(params) + ' left the game';
    }
    return possessiveForm(params.player1Turn ? player1Reference() : player2Reference()) + ' turn';
  }

  function onExit() {
    if (window.confirm('Are you sure you want to exit game?')) {
      if (params.networkGame) params.sendMessage('quit-game');
      params.setupNewGame();
    }
  }

  function setupNew() {
    if (window.confirm('Start new game?')) params.setupNewGame();
  }

  return (<>
    <div className="users">
      <span className="you"><Cell type={playerColor(true)} />{player1Reference()}</span>
      <span className="opponent">{player2Reference()}<Cell type={playerColor(false)} /></span>
    </div>
    <div className="message">{message()}</div>
    {(params.gameResult === NO_RESULT || !player1Local) && <button onClick={onExit}>Exit</button>}
    {params.gameResult !== NO_RESULT && player1Local && <button onClick={setupNew}>Start new</button>}
    <div style={{margin: '30px'}}>
      <Board enable={shouldEnableBoard()} cells={params.cells} onHover={onHover} onClick={onClick} />
    </div>
  </>);
}

export default connect(a => a, actions)(Game);