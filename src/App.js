import React, {useState, useEffect} from 'react';
import './App.css';
import Game from './Game';
import Start from './Start';
import Messenger from './messenger';

const messenger = new Messenger();

function App() {
  const [started, setStarted] = useState(false);
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [player1Local, setPlayer1Local] = useState(true);
  const [player2Local, setPlayer2Local] = useState(true);

  return (<div className="App">
    <div className="title">4 IN A ROW</div>
    <div>
      {!started && <Start messenger={messenger} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} onStart={() => setStarted(true)} messenger={messenger} setPlayer1Local={setPlayer1Local} setPlayer2Local={setPlayer2Local} />}
      {started && <Game player1={player1} player2={player2} player1Local={player1Local} player2Local={player2Local} onExit={() => setStarted(false)} messenger={messenger} />}
    </div>
  </div>);
}

export default App;
