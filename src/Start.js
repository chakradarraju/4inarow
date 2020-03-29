import React, { useState } from 'react';

function Start(params) {
  return (<div style={{margin: '60px'}}>
    Update your names and hit start to play!<br/><br/>
    Player 1: {params.player1}<button onClick={() => params.setPlayer1(prompt("Player 1 name"))}>Change</button><br/>
    Player 2: {params.player2}<button onClick={() => params.setPlayer2(prompt("Player 2 name"))}>Change</button><br/>
    <button style={{margin: '30px'}} onClick={params.onStart}>Start</button>
  </div>);
}

export default Start;