import React, { useState, useEffect, useRef } from 'react';
const shortid = require('shortid');

function Start(params) {
  const [showLocal, setShowLocal] = useState(!hasPeerLocation());
  const [isHost, setIsHost] = useState(true);
  const [peerConnected, setPeerConnected] = useState(false);
  const [signalingConnected, setSignalingConnected] = useState(false);
  const gameStrElement = useRef();
  const gameStr = window.location + '#' + newGameStr();

  function hasPeerLocation() {
    return window.location.hash && window.location.hash.length > 0;
  }

  function parseGameStr(str) {
    console.log('Parsing game str', str);
    const parts = str.split('/');
    return parts.length === 2 ? parts : [null, null];
  }

  function newGameStr() {
    const gameId = shortid.generate();
    return params.messenger.id + '/' + gameId;
  }

  useEffect(() => {
    if (params.messenger.signaling) setSignalingConnected(true);
    else params.messenger.on('signaling-change', (status, id) => {
      setSignalingConnected(status);
      if (!status) return;
      console.log('signaling ready', id);
      if (hasPeerLocation()) {
        setIsHost(false);
        const [hostId, gameId] = parseGameStr(window.location.hash.substr(1));
        if (hostId === null) {
          console.log('Invalid game str');
          return;
        }
        params.messenger.connect(hostId, {metadata: {peerId: params.messenger.id}, reliable: true});
        params.messenger.on('player1-name', name => params.setPlayer1(name));
      } else {
        setIsHost(true);
        params.messenger.expectConnect();
        params.messenger.on('player2-name', name => params.setPlayer2(name));
      }
      if (params.messenger.peerConnected) onPeerConnected();
      else params.messenger.on('peer-connected', onPeerConnected); 
    });
  }, []);

  function onPeerConnected() {
    setPeerConnected(true);
    setShowLocal(false);
    params.messenger.send('player1-name', params.player1);
    params.messenger.send('player2-name', params.player2);
  }

  useEffect(() => {
    params.messenger.send('player1-name', params.player1);
  }, [params.player1]);

  useEffect(() => {
    params.messenger.send('player2-name', params.player2);
  }, [params.player2]);

  function copyGameStr() {
    if (!gameStrElement || !gameStrElement.current) return;
    gameStrElement.current.select();
    document.execCommand('copy');
    alert('Copied, now send it to your friend');
  }

  function setLocalAndStart() {
    params.setPlayer1Local(isHost);
    params.setPlayer2Local(!isHost);
    params.onStart();
  }

  return (<div style={{margin: '30px'}}>
    <div style={{margin: '30px'}}>
      <button style={{padding: showLocal ? '5px' : ''}} onClick={() => setShowLocal(true)}>Local game</button>
      <button style={{padding: showLocal ? '' : '5px'}} onClick={() => setShowLocal(false)}>Network game</button>
    </div>
    {showLocal && <>
      Update your names and hit start to play!<br/><br/>
      Player 1: {params.player1}<button onClick={() => params.setPlayer1(prompt("Player 1 name"))}>Change</button><br/>
      Player 2: {params.player2}<button onClick={() => params.setPlayer2(prompt("Player 2 name"))}>Change</button><br/>
      <button style={{margin: '30px'}} onClick={params.onStart}>Start</button>
    </>}
    {!showLocal && <>
      {!signalingConnected && <div>Connecting to server...</div>}
      {signalingConnected && isHost && <>
        <div style={{margin: '20px'}}>
          <div>Name: {params.player1}<button onClick={() => params.setPlayer1(prompt("Your name"))}>Change</button></div>
          <div>Opponent name: {params.player2}</div>
        </div>
        {!peerConnected && <>
          Ask your friend to open:<br/>
          <input ref={gameStrElement} readOnly value={gameStr} /><button onClick={copyGameStr}>Copy</button>
          <div>Waiting for peer...</div>
        </>}
      </>}
      {signalingConnected && !isHost && <>
        <div style={{margin: '20px'}}>
          <div>Name: {params.player2}<button onClick={() => params.setPlayer2(prompt("Your name"))}>Change</button></div>
          <div>Opponent name: {params.player1}</div>
        </div>
        {!peerConnected && <>Connecting to host...</>}
      </>}
      {peerConnected && <button onClick={setLocalAndStart}>Start</button>}
    </>}
  </div>);
}

export default Start;