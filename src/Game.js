import React, { useEffect } from 'react';
import Board from './Board';
import './Game.css';
import Cell from './Cell';
import { NO_RESULT, TIE, PLAYER1_WON, PLAYER2_WON } from './counter';
import {connect} from 'react-redux';
import {playerColor} from './common';
import * as actions from './actions';

function Game(params) {
  const player1Local = !params.hostId;

  useEffect(() => {
    for (var message of params.inMessages) {
      if (!message.ack && message.msg === 'select') {
        select(message.data);
        params.ackMessage(message);
      }
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

  function otherPlayer() {
    return player1Local ? params.player2Name : params.player1Name;
  }

  function message() {
    if (params.gameResult === TIE) return 'Tie';
    if (params.gameResult === PLAYER1_WON) return params.player1Name + ' won';
    if (params.gameResult === PLAYER2_WON) return params.player2Name + ' won';
    if (params.networkGame && !params.peerConnected) return otherPlayer() + ' disconnected';
    if (params.player1Turn) return params.player1Name + ' turn';
    return params.player2Name + ' turn';
  }

  return (<>
    <div className="users">
      <span className="you"><Cell type={playerColor(true)} />{params.player1Name}</span>
      <span className="opponent">{params.player2Name}<Cell type={playerColor(false)} /></span>
    </div>
    <div className="message">{message()}</div>
    <button onClick={params.exitGame}>Exit</button>
    <div style={{margin: '30px'}}>
      <Board enable={shouldEnableBoard()} cells={params.cells} onHover={onHover} onClick={onClick} />
    </div>
  </>);
}

export default connect(a => a, actions)(Game);