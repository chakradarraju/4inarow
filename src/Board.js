import React, {useState} from 'react';
import Cell from './Cell';

function Board(params) {
  const hoverHandler = (j) => () => params.onHover(j)
  const clickHandler = (j) => () => params.onClick(j);

  return params.cells.map((r, i) => <div key={i}>
    {r.map((c, j) => <Cell 
      type={c}
      key={j}
      enable={params.enable}
      onClick={clickHandler(j)}
      onHover={hoverHandler(j)} />)}
  </div>);
}

export default Board;