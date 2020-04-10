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