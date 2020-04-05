import Peer from 'peerjs';
const shortid = require('shortid');

class Messenger {
  constructor() {
    console.log('Starting messenger');
    var id = localStorage.getItem('client-id');
    if (!id) id = shortid.generate();
    localStorage.setItem('client-id', id);
    console.log('client id', id);
    this.id = id;
    const opts = { secure: window.location.protocol === 'https:' };
    console.log('peer opts', opts);
    this.peer = new Peer(id, opts);
    window.messenger = this;
    this.signaling = null;
    this.connection = null;
    this.peer.on('open', this.onSignalingOpen.bind(this));
    this.peer.on('error', this.onServerError.bind(this));
    this.peer.on('connection', this.setConnection.bind(this));
    this.peerConnection = false;
    this.eventListeners = {};
    this.queue = [];
    this.isClient = false;
  }

  connect(peerId, options) {
    console.log('connecting to host', peerId);
    this.isClient = true;
    this.peerId = peerId;
    this.options = options;
    this.setConnection(this.peer.connect(peerId, options));
  }

  onSignalingOpen(id) {
    this.signaling = true;
    this.trigger('signaling-change', [true, id]);
  }

  onSignalingError(err) {
    this.signaling = false;
    console.error(err);
    this.trigger('signaling-change', [false]);
  }

  isSignalingConnected() {
    return this.signaling;
  }

  setConnection(connection) {
    console.log('Setting up connection', connection);
    this.connection = connection;
    this.connection.on('open', this.onPeerConnected.bind(this));
    this.connection.on('data', this.onData.bind(this));
    this.connection.on('error', this.onError.bind(this));
  }

  onError(err) {
    console.error('Peer connection error', err, err.message, err.message.indexOf('disconnected'));
    if (err.message.indexOf('disconnected') !== -1) this.onDisconnected();
  }

  onServerError(err) {
    console.error('Peer server error', err);
    if (err.message.indexOf('Could not connect to peer') !== -1) this.onDisconnected();
  }

  onDisconnected() {
    this.trigger('peer-connected', [false]);
    if (this.isClient) setTimeout(() => {
      console.log('Trying to reconnect...', this.peerId);
      this.connect(this.peerId, this.options);
    });
  }

  trigger(event, args) {
    const listeners = this.eventListeners[event];
    if (listeners) listeners.forEach(cb => cb(...args));
  }

  on(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  off(event) {
    delete this.eventListeners[event];
  }

  onPeerConnected() {
    this.peerConnection = true;
    this.trigger('peer-connected', [true]);
    for (var i = 0; i < this.queue.length; i++) this.connection.send(this.queue[i]);
    this.queue = [];
  }

  send(type, data) {
    const msg = { type, data };
    if (this.peerConnection) this.connection.send(msg);
    else this.queue.push(msg);
  }

  onData(msg) {
    console.log('got message', msg);
    if (msg.type) this.trigger(msg.type, [msg.data]);
  }
}

export default Messenger;