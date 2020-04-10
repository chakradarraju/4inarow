import React, {useState, useEffect} from 'react';
import './App.css';
import Game from './Game';
import Start from './Start';
import Messenger from './Messenger';
import {connect} from 'react-redux';
import GameManager from './GameManager';
import SyncAgent from './SyncAgent';


function App(params) {
  return (<div className="App">
    <Messenger />
    <GameManager />
    <SyncAgent />
    <div className="title">4 IN A ROW</div>
    <div>
      {!params.gameStarted && <Start />}
      {params.gameStarted && <Game />}
    </div>
  </div>);
}

export default connect(a => a)(App);
