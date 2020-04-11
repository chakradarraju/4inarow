import checkEnd, { NO_RESULT, TIE, PLAYER1_WON, PLAYER2_WON } from './counter';

const N_ROWS = 6;
const N_COLS = 7;
const getInitCells = () => [...Array(N_ROWS)].map(e => new Array(N_COLS).fill('a'));
const INIT_CELLS = getInitCells();

export function myClientId(state = null, action) {
  switch (action.type) {
    case 'UPDATE_CLIENT_ID':
      return action.clientId;
    default:
      return state;
  };
}

export function gameStarted(state = false, action) {
  switch (action.type) {
    case 'GAME_STARTED':
      return true;
    case 'SHOW_START_SCREEN':
      return false;
    default:
      return state;
  }
}

export function gameId(state = null, action) {
  switch (action.type) {
    case 'SET_GAME_ID':
      return action.gameId;
    default:
      return state;
  }
}

export function settingUpNewGame(state = false, action) {
  switch (action.type) {
    case 'SETUP_NEW_GAME':
      return true;
    case 'DONE_SETUP_GAME':
      return false;
    default:
      return state;
  }
}

export function peerGameId(state = null, action) {
  switch (action.type) {
    case 'SET_PEER_GAME_ID':
      return action.peerGameId;
    default:
      return state;
  }
}

export function networkGame(state = false, action) {
  switch (action.type) {
    case 'SET_NETWORK_GAME':
      return action.isNetworkGame;
    default:
      return state;
  }
}

function lowestEmptyCell(cells, j) {
  var i = N_ROWS - 1;
  while (i >= 0 && cells[i][j] !== 'a') i--;
  return i;
}

function removeHoverIndicator(cells, hoverColor) {
  for (var i = 0; i < N_ROWS; i++) for (var j = 0; j < N_COLS; j++)
    if (cells[i][j] === hoverColor)
      cells[i][j] = 'a';
}

function addPiece(state, action) {
  removeHoverIndicator(state, action.color + 'l');
  const i = lowestEmptyCell(state, action.j);
  if (i < 0) {
    console.log('Column does not have empty cell');
    return state;
  }
  state[i][action.j] = action.color;
  return state.slice();
}

export function cells(state = INIT_CELLS, action) {
  switch (action.type) {
    case 'ADD_PIECE':
      return addPiece(state, action);
    case 'HIGHLIGHT':
      removeHoverIndicator(state, action.color + 'l');
      const i = lowestEmptyCell(state, action.j);
      if (i < 0) return state;
      state[i][action.j] = action.color + 'l';
      return state.slice();
    case 'GAME_STARTED':
      return getInitCells();
    case 'SET_CELLS':
      return action.cells;
    default:
      return state;
  }
}

export function gameResult(state = NO_RESULT, action) {
  switch (action.type) {
    case 'CHECK_END':
      return checkEnd(action.cells);
    case 'GAME_STARTED':
      return NO_RESULT;
    default:
      return state;
  }
}

export function player1Turn(state = true, action) {
  switch (action.type) {
    case 'TOGGLE_PLAYER':
      return !state;
    case 'GAME_STARTED':
      return true;
    case 'SET_PLAYER1_TURN':
      return action.player1Turn;
    default:
      return state;
  }
}

function updateIfMatches(message, id, field, value) {
  if (message.id !== id) return message;
  const ret = {...message};
  ret[field] = value;
  return ret;
}

function markMessage(messages, id, field, value) {
  return messages.map(msg => updateIfMatches(msg, id, field, value));
}

export function outMessages(state = [], action) {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return [...state, {id: action.id, msg: action.msg, data: action.data}];
    case 'SENT_MESSAGE':
      return markMessage(state, action.id, 'sent', true);
    default:
      return state;
  }
}

export function inMessages(state = [], action) {
  switch (action.type) {
    case 'RECEIVED_MESSAGE':
      return [...state, {id: action.id, msg: action.msg, data: action.data}];
    case 'ACK_MESSAGE':
      return markMessage(state, action.id, 'ack', true);
    default:
      return state;
  }
}

export function hostId(state = null, action) {
  switch (action.type) {
    case 'SET_HOST':
      return action.hostId;
    default:
      return state;
  }
}

export function serverConnected(state = false, action) {
  switch (action.type) {
    case 'RESET_SERVER_CONNECTION':
      return false;
    case 'SUCCESSFUL_SERVER_CONNECTION':
      return true;
    default:
      return state;
  }
}

export function peerConnected(state = false, action) {
  switch (action.type) {
    case 'RESET_PEER_CONNECTION':
      return false;
    case 'SUCCESSFUL_PEER_CONNECTION':
      return true;
    default:
      return state;
  }
}

export function player1Name(state = 'Player 1', action) {
  switch (action.type) {
    case 'SET_PLAYER1_NAME':
      return action.name;
    default:
      return state;
  }
}

export function player2Name(state = 'Player 2', action) {
  switch (action.type) {
    case 'SET_PLAYER2_NAME':
      return action.name;
    default:
      return state;
  }
}

export function duplicateClient(state = false, action) {
  switch (action.type) {
    case 'MARK_DUPLICATE_CLIENT':
      return true;
    default:
      return state;
  }
}