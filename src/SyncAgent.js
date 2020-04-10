import { connect } from "react-redux";
import React, { useEffect } from 'react';
import * as actions from './actions';


function SyncAgent(params) {

  function processMessage(message) {
    if (message.ack) return;
    if (message.msg === 'ask-player1-name') {
      params.sendMessage('player1-name', params.player1Name);
    } else if (message.msg === 'ask-player2-name') {
      params.sendMessage('player2-name', params.player2Name);
    } else if (message.msg === 'player1-name') {
      params.setPlayer1Name(message.data);
    } else if (message.msg === 'player2-name') {
      params.setPlayer2Name(message.data);
    } else if (message.msg === 'ask-game-started') {
      params.sendMessage('game-started', params.gameStarted);
    } else if (message.msg === 'game-started') {
      if (message.data) {
        params.startGame();
        params.sendMessage('ask-player1-name');
        params.sendMessage('ask-player2-name');
        params.sendMessage('ask-game-cells');
        params.sendMessage('ask-player1-turn');
        params.sendMessage('ask-peer-game-id');
      }
    } else if (message.msg === 'ask-game-cells') {
      params.sendMessage('game-cells', params.cells);
    } else if (message.msg === 'game-cells') {
      params.setCells(message.data);
    } else if (message.msg === 'player1-turn') {
      params.setPlayer1Turn(message.data);
    } else if (message.msg === 'ask-player1-turn') {
      params.sendMessage('player1-turn', params.player1Turn);
    } else return;
    params.ackMessage(message);
  }

  useEffect(() => {
    for (var i = 0; i < params.inMessages.length; i++) processMessage(params.inMessages[i]);
  }, [params.inMessages]);

  useEffect(() => {
    if (params.peerConnected) {
      if (!params.gameStarted) params.sendMessage('ask-game-started', {});
    }
  }, [params.peerConnected]);

  return null;
}

export default connect(a => a, actions)(SyncAgent);