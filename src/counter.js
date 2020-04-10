import {playerColor} from './common';
export const NO_RESULT = 0;
export const TIE = 1;
export const PLAYER1_WON = 2;
export const PLAYER2_WON = 3;

const player1Color = playerColor(true);
const emptyColor = 'a';

class Counter {
  constructor() {
    this.reset();
    this.result = NO_RESULT;
  }

  reset() {
    this.count = 0;
    this.prevColor = emptyColor;
  }

  inc() {
    this.count++;
    if (this.count === 4) this.setWinner();
  }

  setWinner() {
    this.result = this.prevColor === player1Color ? PLAYER1_WON : PLAYER2_WON;
  }

  updateColor(color) {
    this.prevColor = color;
    this.count = 1;
  }

  put(color) {
    if (color === emptyColor) this.reset();
    else if (color === this.prevColor) this.inc();
    else this.updateColor(color);
    return this.result;
  }
}

function boardFull(cells, rows, cols) {
  for (var i = 0; i < rows; i++) for (var j = 0; j < cols; j++) if (cells[i][j] === emptyColor) return false;
  return true;
}

function checkEnd(cells) {
  const N_ROWS = cells.length;
  const N_COLS = cells[0].length;
  const counter = new Counter();
  if (boardFull(cells, N_ROWS, N_COLS)) return TIE;
  for (var i = 0; i < N_ROWS; i++) {
    counter.reset();
    for (var j = 0; j < N_COLS; j++)
      if (counter.put(cells[i][j]) !== NO_RESULT) return counter.result;
  }
  for (var j = 0; j < N_COLS; j++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++)
      if (counter.put(cells[i][j]) !== NO_RESULT) return counter.result;
  }
  for (var d = 0; d < N_ROWS + N_COLS; d++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++) {
      const j = d - i;
      if (j < 0 || j >= N_COLS) continue;
      if (counter.put(cells[i][j]) !== NO_RESULT) return counter.result;
    }
  }
  for (var d = -N_ROWS; d < N_COLS; d++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++) {
      const j = d + i;
      if (j < 0 || j >= N_COLS) continue;
      if (counter.put(cells[i][j]) !== NO_RESULT) return counter.result;
    }
  }
  return NO_RESULT;
}


export default checkEnd;