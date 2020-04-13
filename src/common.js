export function playerColor(player1) {
  return player1 ? 'b' : 'c';
};
  
export function peerConnectionString(params, gameId) {
  const temp = new URL(window.location);
  if (!gameId) gameId = params.gameId;
  temp.hash = params.myClientId + '/' + gameId;
  return temp.toString();
}

export function otherPlayer(params) {
  return !params.hostId ? params.player2Name : params.player1Name;
}

export function myReference(params) {
  const player1Local = !params.hostId;
  return player1Local ? params.player1Name : params.player2Name;  
}

export function otherPlayerReference(params) {
  const player1Local = !params.hostId;
  return player1Local ? params.player2Name : params.player1Name;
}

export function player1Reference(params) {
  const player1Local = !params.hostId;
  return params.networkGame && player1Local ? 'You' : params.player1Name;
}

export function player2Reference(params) {
  const player1Local = !params.hostId;
  return params.networkGame && !player1Local ? 'You' : params.player2Name;
}

export function possessiveForm(noun) {
  return noun === 'You' ? 'Your' : (noun + "'s")
}
