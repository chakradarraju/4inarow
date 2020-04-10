import { connect } from "react-redux";
import * as actions from './actions';
import React, { useState, useEffect } from "react";
import {peerConnectionString, otherPlayer} from './common';
const shortid = require('shortid');

function GameManager(params) {
  const [gameHash, setGameHash] = useState(null);

  function parseGameId() {
    if (gameHash.indexOf('/') === -1) return [null, gameHash];
    return gameHash.split('/');
  }

  useEffect(() => {
    setGameHash(window.location.hash.length > 1 ? window.location.hash.substr(1) : shortid.generate());
  }, []);

  useEffect(() => {
    for (var message of params.inMessages) if (!message.ack) {
      if (message.msg === 'peer-game-id') {
        params.setPeerGameId(message.data);
      } else if (message.msg === 'new-game') {
        if (window.confirm(otherPlayer(params) + ' started a new game, join?')) {
          const url = new URL(message.data);
          const hash = url.hash.substr(1);
          window.location.hash = hash;
          setGameHash(hash);
          params.exitGame();
        }
      } else if (message.msg === 'ask-peer-game-id') {
        params.sendMessage('peer-game-id', params.gameId);
      } else return;
      params.ackMessage(message);
    }
  }, [params.inMessages]);

  useEffect(() => {
    window.location.hash = gameHash;
  }, [gameHash]);

  useEffect(() => {
    if (gameHash && gameHash.length) {
      const [hostId, gameId] = parseGameId();
      params.setHostId(hostId);
      params.setGameId(gameId);  
      params.sendMessage('peer-game-id', gameId);
    }
  }, [gameHash]);

  useEffect(() => {
    if (params.settingUpNewGame) {
      console.log('Setting up new game');
      const gameId = shortid.generate();
      setGameHash(gameId);
      params.sendMessage('new-game', peerConnectionString(params, gameId));
      params.doneSetupGame();
      params.exitGame();
    }
  }, [params.settingUpNewGame]);

  useEffect(() => {
    if (params.gameStarted && params.networkGame) params.sendMessage('ask-peer-game-id', true);
  }, [params.gameStarted]);

  return null;
}

export default connect(a => a, actions)(GameManager);