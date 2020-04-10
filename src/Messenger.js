import Peer from 'peerjs';
import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import * as actions from './actions';
const shortid = require('shortid');

const opts = { secure: window.location.protocol === 'https:' };

function Messenger(params) {

  const [serverConnection, setServerConnection] = useState(null);
  const [serverConnectionError, setServerConnectionError] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [peerConnectionError, setPeerConnectionError] = useState(null);
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    const existingId = localStorage.getItem('client-id');
    const id = existingId ? existingId : shortid.generate();
    localStorage.setItem('client-id', id);
    params.updateClientId(id);
  }, []);
  
  useEffect(() => {
    if (!params.myClientId) {
      console.log('Not creating connection to server', params.myClientId);
      return;
    }
    console.log('Connecting to server with', params.myClientId);
    setServerConnection(new Peer(params.myClientId, opts));
  }, [params.myClientId]);

  function onServerDisconnected() {
    setTimeout(() => {
      if (serverConnection && serverConnection.disconnected) {
        console.log('Trying to reconnect to server...');
        serverConnection.reconnect();
      }
    }, 1000);
  }

  useEffect(() => {
    if (!serverConnection || serverConnection.disconnected) {
      params.resetServerConnection();
      onServerDisconnected();
    }
    if (serverConnectionError && serverConnectionError.message.indexOf('Could not connect to peer') !== -1) tryPeerConnect();
  }, [serverConnectionError]);

  useEffect(() => {
    if (params.serverConnected) setServerConnectionError(null);
  }, [params.serverConnected]);

  useEffect(() => {
    if (!serverConnection) {
      console.log('Skipping event handlers on invalid serverconnection', null);
      return;
    }
    console.log('Setting up server connection');
    params.resetServerConnection();
    serverConnection.on('open', id => {
      params.successfulServerConnection();
    });
    serverConnection.on('error', err => {
      console.error('Got server error', err);
      setServerConnectionError(err);
    });
    serverConnection.on('connection', connection => {
      setPeerConnection(connection);
    });
    return () => {
      serverConnection.off('open');
      serverConnection.off('error');
      serverConnection.off('connection');
    }
  }, [serverConnection]);

  useEffect(() => {
    if (!peerConnection) {
      console.log('no peer connection');
      return;
    }
    peerConnection.on('open', () => {
      console.log('peer connected');
      params.successfulPeerConnection();
    });
    peerConnection.on('data', msg => {
      console.log('Received message', msg);
      params.receiveMessage(msg.msg, msg.data);
    });
    peerConnection.on('error', err => {
      console.error('Peer connection error', err);
      setPeerConnectionError(err);
      params.resetPeerConnection();
    });
    return () => {
      peerConnection.off('open');
      peerConnection.off('data');
      peerConnection.off('error');
    }
  }, [peerConnection]);

  function tryPeerConnect() {
    if (!params.hostId) {
      console.log('hostId missing', params.hostId);
      return;
    }
    setPeerConnection(serverConnection.connect(params.hostId, {metadata: {peerId: params.myClientId}, reliable: true}));
  }

  function onDisconnected() {
    if (isClient) setTimeout(() => {
      console.log('Trying to reconnect...', params.hostId);
      tryPeerConnect();
    }, 1000);
  }

  useEffect(() => {
    if (peerConnectionError && peerConnectionError.message.indexOf('disconnected') !== -1) onDisconnected();
  }, [peerConnectionError]);

  useEffect(() => {
    if (params.peerConnected) setPeerConnectionError(null);
  }, [params.peerConnected]);

  useEffect(() => {
    if (!serverConnection || !params.serverConnected) {
      console.log('Not connected to server, skipping connecting to host', params.hostId, serverConnection, params.serverConnected);
      return;
    }
    if (!params.hostId) return;
    setIsClient(true);
    tryPeerConnect();
  }, [serverConnection, params.serverConnected, params.hostId]);

  useEffect(() => {
    if (!params.peerConnected) {
      console.log('Unable to send message');
      return;
    }
    for (var message of params.outMessages) {
      if (!message.sent) {
        peerConnection.send({msg: message.msg, data: message.data});
        params.sentMessage(message);
      }
    }
  }, [params.outMessages, params.peerConnected]);

  return null;
}

export default connect(a => a, actions)(Messenger);