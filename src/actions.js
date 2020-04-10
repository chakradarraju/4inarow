const shortid = require('shortid');

export const onExit = () => ({type: 'EXIT_GAME'});

export const highlight = (j, color) => ({type: 'HIGHLIGHT', j, color});

export const sendMessage = (msg, data) => ({type: 'SEND_MESSAGE', msg, data, id: shortid.generate()});

export const sentMessage = message => ({type: 'SENT_MESSAGE', id: message.id});

export const receiveMessage = (msg, data) => ({type: 'RECEIVED_MESSAGE', msg, data, id: shortid.generate()})

export const ackMessage = message => ({type: 'ACK_MESSAGE', id: message.id});

export const addPiece = (j, color) => ({type: 'ADD_PIECE', j, color});

export const checkEnd = cells => ({type: 'CHECK_END', cells});

export const togglePlayer = () => ({type: 'TOGGLE_PLAYER'});

export const setHostId = hostId => ({type: 'SET_HOST', hostId});

export const removeHostId = () => ({type: 'REMOVE_HOST'});

export const setNetworkGame = isNetworkGame => ({type: 'SET_NETWORK_GAME', isNetworkGame});

export const updateClientId = clientId => ({type: 'UPDATE_CLIENT_ID', clientId});

export const resetServerConnection = () => ({type: 'RESET_SERVER_CONNECTION'});

export const successfulServerConnection = () => ({type: 'SUCCESSFUL_SERVER_CONNECTION'});

export const resetPeerConnection = () => ({type: 'RESET_PEER_CONNECTION'});

export const successfulPeerConnection = () => ({type: 'SUCCESSFUL_PEER_CONNECTION'});

export const setPlayer1Name = name => ({type: 'SET_PLAYER1_NAME', name});

export const setPlayer2Name = name => ({type: 'SET_PLAYER2_NAME', name});

export const startGame = () => ({type: 'GAME_STARTED'});

export const exitGame = () => ({type: 'SHOW_START_SCREEN'});