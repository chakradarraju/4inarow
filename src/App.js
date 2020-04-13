import React, {useState, useEffect} from 'react';
import './App.css';
import Game from './Game';
import Start from './Start';
import Messenger from './Messenger';
import {connect} from 'react-redux';
import GameManager from './GameManager';
import SyncAgent from './SyncAgent';
import ReactJson from 'react-json-view';
import ChatWindow from './ChatWindow';

function App(params) {
  return (<div className="App">
    <Messenger />
    <GameManager />
    <SyncAgent />
    <div className="title">4 IN A ROW<div className="howto" title="
    Game is played by 2 players taking alternate turns,
    in his turn player chooses a column and a piece of their color is placed in lowest free cell,
    first player to get 4 pieces of his color in a row (horizontal, vertical or diagonal) wins.">?</div></div>
    <div>
      {!params.gameStarted && <Start />}
      {params.gameStarted && <Game />}
    </div>
    {params.peerConnected && <ChatWindow />}
    {localStorage.getItem('4inarow_debug') && <ReactJson src={params} />}
  </div>);
}

export default connect(a => a)(App);
