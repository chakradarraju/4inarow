import React from 'react';
import './Cell.css';

function Cell(params) {
  const gatedAttributes = params.enable ? {
    onMouseEnter: params.onHover,
    onClick: params.onClick
  } : {};
  return <div {...gatedAttributes} className={'cell ' + params.type}></div>;
}

export default Cell;