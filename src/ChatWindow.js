import { connect } from "react-redux";
import * as actions from './actions';
import React, { useState, useEffect, useRef } from "react";
import {otherPlayerReference, myReference} from './common';
import './ChatWindow.css';

function ChatWindow(params) {
  const [messages, setMessages] = useState([]);
  const [messageDraft, setMessageDraft] = useState('');

  function processInMessage(message) {
    if (message.ack) return;
    if (message.msg === 'text-message') {
      setMessages([{from: 'other', data: message.data} , ...messages]);
    } else return;
    params.ackMessage(message);
  }

  useEffect(() => {
    for (var message of params.inMessages) processInMessage(message);
  }, [params.inMessages, params.outMessages]);

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      if (messageDraft.length === 0) {
        console.log('not sending empty message');
        return;
      }
      params.sendMessage('text-message', messageDraft);
      setMessages([{from: 'me', data: messageDraft}, ...messages]);
      setMessageDraft('');
    }
  }

  return <div className="chat-root">
    <div>
      Chat with {otherPlayerReference(params)}: 
      <input value={messageDraft} onKeyDown={onKeyDown} onChange={e => setMessageDraft(e.target.value)} />
    </div>
    <div className="messages">
      {messages.map((m, i) => <div key={i} className={"message " + m.from}>{(m.from === 'me' ? myReference : otherPlayerReference)(params)}: {m.data}</div>)}
    </div>
  </div>;
}

export default connect(a => a, actions)(ChatWindow);