import React, {useState} from 'react';
import './App.css';
import Game from './Game';
import Start from './Start';

function App() {
  const [started, setStarted] = useState(false);
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');

  return (<div className="App">
    <div className="title">4 IN A ROW</div>
    <div>
      {!started && <Start player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} onStart={() => setStarted(true)} />}
      {started && <Game player1={player1} player2={player2} onExit={() => setStarted(false)} />}
    </div>
  </div>);
}

export default App;
