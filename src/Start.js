import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import {peerConnectionString} from './common';

function Start(params) {
  const gameStrElement = useRef();
  const [youStarted, setYouStarted] = useState(false);
  const [peerStarted, setPeerStarted] = useState(false);

  function processMessage(message) {
    if (message.ack) return;
    if (message.msg === 'peer-started') {
      console.log('Got peer started');
      setPeerStarted(true);
    } else if (message.msg === 'ask-peer-started') {
      console.log('Got peer started ask');
      if (youStarted) params.sendMessage('peer-started', true);
    } else {
      return;
    }
    params.ackMessage(message);
  }

  useEffect(() => {
    if (!params.inMessages) return;
    for (var i = 0; i < params.inMessages.length; i++) processMessage(params.inMessages[i]);
  }, [params.inMessages, params.hostId]);

  useEffect(() => {
    if (params.peerConnected) {
      params.setNetworkGame(true);
      if (params.hostId) params.sendMessage('ask-player1-name', {});
      else params.sendMessage('ask-player2-name', {});
    }
  }, [params.peerConnected]);

  useEffect(() => {
    if (params.networkGame && !params.hostId) params.sendMessage('player1-name', params.player1Name);
  }, [params.player1Name]);

  useEffect(() => {
    if (params.networkGame && params.hostId) params.sendMessage('player2-name', params.player2Name);
  }, [params.player2Name]);

  function copyGameStr() {
    if (!gameStrElement || !gameStrElement.current) return;
    gameStrElement.current.select();
    document.execCommand('copy');
    alert('Copied, now send it to your friend');
  }

  useEffect(() => {
    if (youStarted) params.sendMessage('peer-started', {});
  }, [youStarted]);

  useEffect(() => {
    if (!youStarted) return;
    if (peerStarted) params.startGame();
    else params.sendMessage('ask-peer-started', {});
  }, [youStarted, peerStarted]);

  function hostUI() {
    return <>
      <div style={{margin: '20px'}}>
        <div>Name: {params.player1Name}<button onClick={() => params.setPlayer1Name(prompt("Your name"))}>Change</button></div>
        <div>Opponent name: {params.player2Name}</div>
      </div>
      {!params.peerConnected && <>
        Ask your friend to open:<br/>
        <input ref={gameStrElement} readOnly value={peerConnectionString(params)} /><button onClick={copyGameStr}>Copy</button>
        <div>Waiting for peer...</div>
      </>}
    </>
  }

  function peerUI() {
    return <>
      <div style={{margin: '20px'}}>
        <div>Name: {params.player2Name}<button onClick={() => params.setPlayer2Name(prompt("Your name"))}>Change</button></div>
        <div>Opponent name: {params.player1Name}</div>
      </div>
      {!params.peerConnected && <>Connecting to host...</>}
    </>
  }

  function networkGameUI() {
    if (params.duplicateClient) return <>You've already connected from another tab, maybe close other tabs of 4-in-a-row page?</>;
    if (!params.serverConnected) return <>Connecting to server...</>;
    return <>
      {!params.hostId && hostUI()}
      {params.hostId && peerUI()}
      {params.peerConnected && youStarted && <div>Waiting for peer to start...</div>}
      {params.peerConnected && !youStarted && <button onClick={() => setYouStarted(true)}>Start</button>}
    </>
  }

  function localGameUI() {
    return <>
      Update your names and hit start to play!<br/><br/>
      Player 1: {params.player1Name}<button onClick={() => params.setPlayer1Name(prompt("Player 1 name"))}>Change</button><br/>
      Player 2: {params.player2Name}<button onClick={() => params.setPlayer2Name(prompt("Player 2 name"))}>Change</button><br/>
      <button style={{margin: '30px'}} onClick={params.startGame}>Start</button>
    </>
  }

  return (<div style={{margin: '30px'}}>
    <div style={{margin: '30px'}}>
      <button style={{padding: params.networkGame ? '' : '5px'}} onClick={() => params.setNetworkGame(false)}>Local game</button>
      <button style={{padding: params.networkGame ? '5px' : ''}} onClick={() => params.setNetworkGame(true)}>Network game</button>
    </div>
    {!params.networkGame && localGameUI()}
    {params.networkGame && networkGameUI()}
  </div>);
}

export default connect(a => a, actions)(Start);