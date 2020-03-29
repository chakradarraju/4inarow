
class Counter {
  constructor() {
    this.reset();
  }

  reset() {
    this.n = 0;
    this.c = '';
  }

  count(cc) {
    if (this.c === cc) {
      this.n++;
      if (this.n === 4) return true;
    } else {
      this.c = cc;
      this.n = 1;
    }
    return false;
  }

  currentColor() {
    return this.c;
  }
}

function checkEnd(cells) {
  const N_ROWS = cells.length;
  const N_COLS = cells[0].length;
  const counter = new Counter();
  var ne = 0;
  for (var i = 0; i < N_ROWS; i++) {
    counter.reset();
    for (var j = 0; j < N_COLS; j++) {
      if (cells[i][j] === 'e') {
        ne++;
        counter.reset();
      } else {
        if (counter.count(cells[i][j])) {
          return counter.currentColor();
        }          
      }
    }
  }
  if (ne === 0) return 'tie';
  for (var j = 0; j < N_COLS; j++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++) {
      if (cells[i][j] !== 'e') {
        if (counter.count(cells[i][j])) {
          return counter.currentColor();
        }
      } else counter.reset();
    }
  }
  for (var d = 0; d < N_ROWS + N_COLS; d++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++) {
      const j = d - i;
      if (j < 0 || j >= N_COLS) continue;
      if (cells[i][j] !== 'e') {
        if (counter.count(cells[i][j])) {
          return counter.currentColor();
        }
      } else counter.reset();
    }
  }
  for (var d = -N_ROWS; d < N_COLS; d++) {
    counter.reset();
    for (var i = 0; i < N_ROWS; i++) {
      const j = d + i;
      if (j < 0 || j >= N_COLS) continue;
      if (cells[i][j] !== 'e') {
        if (counter.count(cells[i][j])) {
          return counter.currentColor();
        }
      } else counter.reset();
    }
  }
  return null;
}


export default checkEnd;