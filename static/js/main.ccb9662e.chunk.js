(this.webpackJsonp4inarow=this.webpackJsonp4inarow||[]).push([[0],{21:function(e,t,n){e.exports=n(45)},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},44:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=44},45:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"onExit",(function(){return N})),n.d(r,"highlight",(function(){return O})),n.d(r,"sendMessage",(function(){return _})),n.d(r,"sentMessage",(function(){return b})),n.d(r,"receiveMessage",(function(){return w})),n.d(r,"ackMessage",(function(){return k})),n.d(r,"addPiece",(function(){return T})),n.d(r,"checkEnd",(function(){return I})),n.d(r,"togglePlayer",(function(){return G})),n.d(r,"setHostId",(function(){return M})),n.d(r,"setGameId",(function(){return j})),n.d(r,"setPeerGameId",(function(){return R})),n.d(r,"setNetworkGame",(function(){return A})),n.d(r,"updateClientId",(function(){return P})),n.d(r,"resetServerConnection",(function(){return D})),n.d(r,"successfulServerConnection",(function(){return L})),n.d(r,"resetPeerConnection",(function(){return U})),n.d(r,"successfulPeerConnection",(function(){return x})),n.d(r,"setPlayer1Name",(function(){return H})),n.d(r,"setPlayer2Name",(function(){return Y})),n.d(r,"startGame",(function(){return W})),n.d(r,"exitGame",(function(){return F})),n.d(r,"setupNewGame",(function(){return V})),n.d(r,"doneSetupGame",(function(){return K})),n.d(r,"setCells",(function(){return X})),n.d(r,"setPlayer1Turn",(function(){return q}));var a={};n.r(a),n.d(a,"myClientId",(function(){return me})),n.d(a,"gameStarted",(function(){return ge})),n.d(a,"gameId",(function(){return Ee})),n.d(a,"settingUpNewGame",(function(){return pe})),n.d(a,"peerGameId",(function(){return ve})),n.d(a,"networkGame",(function(){return ye})),n.d(a,"cells",(function(){return Ne})),n.d(a,"gameResult",(function(){return Oe})),n.d(a,"player1Turn",(function(){return _e})),n.d(a,"outMessages",(function(){return we})),n.d(a,"inMessages",(function(){return ke})),n.d(a,"hostId",(function(){return Te})),n.d(a,"serverConnected",(function(){return Ie})),n.d(a,"peerConnected",(function(){return Ge})),n.d(a,"player1Name",(function(){return Me})),n.d(a,"player2Name",(function(){return je}));var o=n(0),c=n.n(o),u=n(7),s=n.n(u),i=(n(26),n(27),n(8));n(28);var l=function(e){var t=e.enable?{onMouseEnter:e.onHover,onClick:e.onClick}:{};return c.a.createElement("div",Object.assign({},t,{className:"cell "+e.type}))};var f=function(e){var t=function(t){return function(){return e.onHover(t)}},n=function(t){return function(){return e.onClick(t)}};return e.cells.map((function(r,a){return c.a.createElement("div",{key:a},r.map((function(r,a){return c.a.createElement(l,{type:r,key:a,enable:e.enable,onClick:n(a),onHover:t(a)})})))}))},d=(n(29),n(15)),m=n(16);function g(e){return e?"b":"c"}function E(e,t){var n=new URL(window.location);return t||(t=e.gameId),n.hash=e.myClientId+"/"+t,n.toString()}function p(e){return e.hostId?e.player1Name:e.player2Name}var v=g(!0),y=function(){function e(){Object(d.a)(this,e),this.reset(),this.result=0}return Object(m.a)(e,[{key:"reset",value:function(){this.count=0,this.prevColor="a"}},{key:"inc",value:function(){this.count++,4===this.count&&this.setWinner()}},{key:"setWinner",value:function(){this.result=this.prevColor===v?2:3}},{key:"updateColor",value:function(e){this.prevColor=e,this.count=1}},{key:"put",value:function(e){return"a"===e?this.reset():e===this.prevColor?this.inc():this.updateColor(e),this.result}}]),e}();var h=function(e){var t=e.length,n=e[0].length,r=new y;if(function(e,t,n){for(var r=0;r<t;r++)for(var a=0;a<n;a++)if("a"===e[r][a])return!1;return!0}(e,t,n))return 1;for(var a=0;a<t;a++){r.reset();for(var o=0;o<n;o++)if(0!==r.put(e[a][o]))return r.result}for(o=0;o<n;o++){r.reset();for(a=0;a<t;a++)if(0!==r.put(e[a][o]))return r.result}for(var c=0;c<t+n;c++){r.reset();for(a=0;a<t;a++){var u=c-a;if(!(u<0||u>=n)&&0!==r.put(e[a][u]))return r.result}}for(c=-t;c<n;c++){r.reset();for(a=0;a<t;a++){var s=c+a;if(!(s<0||s>=n)&&0!==r.put(e[a][s]))return r.result}}return 0},C=n(1),S=n(10),N=function(){return{type:"EXIT_GAME"}},O=function(e,t){return{type:"HIGHLIGHT",j:e,color:t}},_=function(e,t){return{type:"SEND_MESSAGE",msg:e,data:t,id:S.generate()}},b=function(e){return{type:"SENT_MESSAGE",id:e.id}},w=function(e,t){return{type:"RECEIVED_MESSAGE",msg:e,data:t,id:S.generate()}},k=function(e){return{type:"ACK_MESSAGE",id:e.id}},T=function(e,t){return{type:"ADD_PIECE",j:e,color:t}},I=function(e){return{type:"CHECK_END",cells:e}},G=function(){return{type:"TOGGLE_PLAYER"}},M=function(e){return{type:"SET_HOST",hostId:e}},j=function(e){return{type:"SET_GAME_ID",gameId:e}},R=function(e){return{type:"SET_PEER_GAME_ID",peerGameId:e}},A=function(e){return{type:"SET_NETWORK_GAME",isNetworkGame:e}},P=function(e){return{type:"UPDATE_CLIENT_ID",clientId:e}},D=function(){return{type:"RESET_SERVER_CONNECTION"}},L=function(){return{type:"SUCCESSFUL_SERVER_CONNECTION"}},U=function(){return{type:"RESET_PEER_CONNECTION"}},x=function(){return{type:"SUCCESSFUL_PEER_CONNECTION"}},H=function(e){return{type:"SET_PLAYER1_NAME",name:e}},Y=function(e){return{type:"SET_PLAYER2_NAME",name:e}},W=function(){return{type:"GAME_STARTED"}},F=function(){return{type:"SHOW_START_SCREEN"}},V=function(){return{type:"SETUP_NEW_GAME"}},K=function(){return{type:"DONE_SETUP_GAME"}},X=function(e){return{type:"SET_CELLS",cells:e}},q=function(e){return{type:"SET_PLAYER1_TURN",player1Turn:e}};var B=Object(C.b)((function(e){return e}),r)((function(e){var t=!e.hostId;function n(t){e.addPiece(t,g(e.player1Turn)),e.checkEnd(e.cells),0===e.gameResult&&e.togglePlayer()}function r(){return e.networkGame&&t?"You":e.player1Name}function a(){return e.networkGame&&!t?"You":e.player2Name}return Object(o.useEffect)((function(){var t,r=Object(i.a)(e.inMessages);try{for(r.s();!(t=r.n()).done;){var a=t.value;a.ack||("select"===a.msg?n(a.data):"quit-game"===a.msg&&(alert(p(e)+" has quit game"),e.setupNewGame()),e.ackMessage(a))}}catch(o){r.e(o)}finally{r.f()}}),[e.inMessages]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"users"},c.a.createElement("span",{className:"you"},c.a.createElement(l,{type:g(!0)}),r()),c.a.createElement("span",{className:"opponent"},a(),c.a.createElement(l,{type:g(!1)}))),c.a.createElement("div",{className:"message"},function(){if(1===e.gameResult)return"Tie";if(2===e.gameResult)return r()+" won";if(3===e.gameResult)return a()+" won";if(e.networkGame){if(!e.serverConnected)return"You're not connected to server, check internet";if(!e.peerConnected)return p(e)+" disconnected";if(e.peerConnected&&e.peerGameId!==e.gameId)return p(e)+" left the game"}return("You"===(t=e.player1Turn?r():a())?"Your":t+"'s")+" turn";var t}()),(0===e.gameResult||!t)&&c.a.createElement("button",{onClick:function(){window.confirm("Are you sure you want to exit game?")&&(e.networkGame&&e.sendMessage("quit-game"),e.setupNewGame())}},"Exit"),0!==e.gameResult&&t&&c.a.createElement("button",{onClick:function(){window.confirm("Start new game?")&&e.setupNewGame()}},"Start new"),c.a.createElement("div",{style:{margin:"30px"}},c.a.createElement(f,{enable:0===e.gameResult&&(!e.networkGame||e.peerConnected&&t===e.player1Turn),cells:e.cells,onHover:function(t){e.highlight(t,g(e.player1Turn))},onClick:function(t){e.networkGame&&e.sendMessage("select",t),n(t)}})))})),J=n(2);var $=Object(C.b)((function(e){return e}),r)((function(e){var t=Object(o.useRef)(),n=Object(o.useState)(!1),r=Object(J.a)(n,2),a=r[0],u=r[1],s=Object(o.useState)(!1),i=Object(J.a)(s,2),l=i[0],f=i[1];function d(t){if(!t.ack){if("peer-started"===t.msg)console.log("Got peer started"),f(!0);else{if("ask-peer-started"!==t.msg)return;console.log("Got peer started ask"),a&&e.sendMessage("peer-started",!0)}e.ackMessage(t)}}return Object(o.useEffect)((function(){if(e.inMessages)for(var t=0;t<e.inMessages.length;t++)d(e.inMessages[t])}),[e.inMessages,e.hostId]),Object(o.useEffect)((function(){e.peerConnected&&(e.setNetworkGame(!0),e.hostId?e.sendMessage("ask-player1-name",{}):e.sendMessage("ask-player2-name",{}))}),[e.peerConnected]),Object(o.useEffect)((function(){e.networkGame&&!e.hostId&&e.sendMessage("player1-name",e.player1Name)}),[e.player1Name]),Object(o.useEffect)((function(){e.networkGame&&e.hostId&&e.sendMessage("player2-name",e.player2Name)}),[e.player2Name]),Object(o.useEffect)((function(){a&&e.sendMessage("peer-started",{})}),[a]),Object(o.useEffect)((function(){a&&(l?e.startGame():e.sendMessage("ask-peer-started",{}))}),[a,l]),c.a.createElement("div",{style:{margin:"30px"}},c.a.createElement("div",{style:{margin:"30px"}},c.a.createElement("button",{style:{padding:e.networkGame?"":"5px"},onClick:function(){return e.setNetworkGame(!1)}},"Local game"),c.a.createElement("button",{style:{padding:e.networkGame?"5px":""},onClick:function(){return e.setNetworkGame(!0)}},"Network game")),!e.networkGame&&c.a.createElement(c.a.Fragment,null,"Update your names and hit start to play!",c.a.createElement("br",null),c.a.createElement("br",null),"Player 1: ",e.player1Name,c.a.createElement("button",{onClick:function(){return e.setPlayer1Name(prompt("Player 1 name"))}},"Change"),c.a.createElement("br",null),"Player 2: ",e.player2Name,c.a.createElement("button",{onClick:function(){return e.setPlayer2Name(prompt("Player 2 name"))}},"Change"),c.a.createElement("br",null),c.a.createElement("button",{style:{margin:"30px"},onClick:e.startGame},"Start")),e.networkGame&&c.a.createElement(c.a.Fragment,null,!e.serverConnected&&c.a.createElement("div",null,"Connecting to server..."),e.serverConnected&&!e.hostId&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{style:{margin:"20px"}},c.a.createElement("div",null,"Name: ",e.player1Name,c.a.createElement("button",{onClick:function(){return e.setPlayer1Name(prompt("Your name"))}},"Change")),c.a.createElement("div",null,"Opponent name: ",e.player2Name)),!e.peerConnected&&c.a.createElement(c.a.Fragment,null,"Ask your friend to open:",c.a.createElement("br",null),c.a.createElement("input",{ref:t,readOnly:!0,value:E(e)}),c.a.createElement("button",{onClick:function(){t&&t.current&&(t.current.select(),document.execCommand("copy"),alert("Copied, now send it to your friend"))}},"Copy"),c.a.createElement("div",null,"Waiting for peer..."))),e.serverConnected&&e.hostId&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{style:{margin:"20px"}},c.a.createElement("div",null,"Name: ",e.player2Name,c.a.createElement("button",{onClick:function(){return e.setPlayer2Name(prompt("Your name"))}},"Change")),c.a.createElement("div",null,"Opponent name: ",e.player1Name)),!e.peerConnected&&c.a.createElement(c.a.Fragment,null,"Connecting to host...")),e.serverConnected&&e.peerConnected&&a&&c.a.createElement("div",null,"Waiting for peer to start..."),e.serverConnected&&e.peerConnected&&!a&&c.a.createElement("button",{onClick:function(){return u(!0)}},"Start")))})),z=n(18),Q=n.n(z),Z=n(10),ee={secure:"https:"===window.location.protocol};var te=Object(C.b)((function(e){return e}),r)((function(e){var t=Object(o.useState)(null),n=Object(J.a)(t,2),r=n[0],a=n[1],c=Object(o.useState)(null),u=Object(J.a)(c,2),s=u[0],l=u[1],f=Object(o.useState)(null),d=Object(J.a)(f,2),m=d[0],g=d[1],E=Object(o.useState)(null),p=Object(J.a)(E,2),v=p[0],y=p[1],h=Object(o.useState)(!0),C=Object(J.a)(h,2),S=C[0],N=C[1];function O(){e.hostId?g(r.connect(e.hostId,{metadata:{peerId:e.myClientId},reliable:!0})):console.log("hostId missing",e.hostId)}return Object(o.useEffect)((function(){var t=localStorage.getItem("client-id"),n=t||Z.generate();n!==t&&localStorage.setItem("client-id",n),e.updateClientId(n)}),[]),Object(o.useEffect)((function(){if(e.myClientId){if(r&&e.myClientId===r.id)return void console.log("Id did not change",e.myClientId,r.id);console.log("Connecting to server with",e.myClientId),a(new Q.a(e.myClientId,ee))}}),[e.myClientId]),Object(o.useEffect)((function(){r&&!r.disconnected||(console.log("Disconnected from server"),e.resetServerConnection(),setTimeout((function(){r&&r.disconnected&&(console.log("Trying to reconnect to server..."),r.reconnect())}),1e3)),s&&-1!==s.message.indexOf("Could not connect to peer")&&O()}),[s]),Object(o.useEffect)((function(){e.serverConnected&&l(null)}),[e.serverConnected]),Object(o.useEffect)((function(){if(r)return console.log("Setting up server connection"),e.resetServerConnection(),r.on("open",(function(t){console.log("Successfully connected to server"),e.successfulServerConnection()})),r.on("error",(function(e){console.error("Got server error",e),l(e)})),r.on("connection",(function(e){g(e)})),function(){r.off("open"),r.off("error"),r.off("connection")};console.log("Skipping event handlers on invalid serverconnection",r)}),[r]),Object(o.useEffect)((function(){if(m)return m.on("open",(function(){console.log("peer connected"),e.successfulPeerConnection()})),m.on("data",(function(t){console.log("Received message",t),e.receiveMessage(t.msg,t.data)})),m.on("error",(function(t){console.error("Peer connection error",t),y(t),e.resetPeerConnection()})),function(){m.off("open"),m.off("data"),m.off("error")};console.log("no peer connection")}),[m]),Object(o.useEffect)((function(){v&&-1!==v.message.indexOf("disconnected")&&S&&setTimeout((function(){console.log("Trying to reconnect...",e.hostId),O()}),1e3)}),[v]),Object(o.useEffect)((function(){e.peerConnected&&y(null)}),[e.peerConnected]),Object(o.useEffect)((function(){r&&e.serverConnected?e.hostId&&(N(!0),O()):console.log("Not connected to server, skipping connecting to host",e.hostId,r,e.serverConnected)}),[r,e.serverConnected,e.hostId]),Object(o.useEffect)((function(){if(e.peerConnected){var t,n=Object(i.a)(e.outMessages);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.sent||(m.send({msg:r.msg,data:r.data}),e.sentMessage(r))}}catch(a){n.e(a)}finally{n.f()}}else console.log("Unable to send message")}),[e.outMessages,e.peerConnected]),null})),ne=n(10);var re=Object(C.b)((function(e){return e}),r)((function(e){var t=Object(o.useState)(null),n=Object(J.a)(t,2),r=n[0],a=n[1];function c(t){if(!t.ack){if("peer-game-id"===t.msg)e.setPeerGameId(t.data);else if("new-game"===t.msg)if(window.confirm(p(e)+" started a new game, join?")){var n=new URL(t.data);a(n.hash.substr(1)),e.exitGame()}else e.setupNewGame();else{if("ask-peer-game-id"!==t.msg)return;e.sendMessage("peer-game-id",e.gameId)}e.ackMessage(t)}}return Object(o.useEffect)((function(){a(window.location.hash.length>1?window.location.hash.substr(1):ne.generate())}),[]),Object(o.useEffect)((function(){for(var t=0;t<e.inMessages.length;t++)c(e.inMessages[t])}),[e.inMessages]),Object(o.useEffect)((function(){window.location.hash=r}),[r]),Object(o.useEffect)((function(){if(r&&r.length){var t=-1===r.indexOf("/")?[null,r]:r.split("/"),n=Object(J.a)(t,2),a=n[0],o=n[1];e.setHostId(a),e.setGameId(o),e.networkGame&&e.sendMessage("peer-game-id",o)}}),[r]),Object(o.useEffect)((function(){if(e.settingUpNewGame){console.log("Setting up new game");var t=ne.generate();a(t),e.peerConnected&&e.sendMessage("new-game",E(e,t)),e.doneSetupGame(),e.exitGame()}}),[e.settingUpNewGame]),Object(o.useEffect)((function(){e.gameStarted&&e.networkGame&&e.sendMessage("ask-peer-game-id",!0)}),[e.gameStarted]),null}));var ae=Object(C.b)((function(e){return e}),r)((function(e){function t(t){if(!t.ack){if("ask-player1-name"===t.msg)e.sendMessage("player1-name",e.player1Name);else if("ask-player2-name"===t.msg)e.sendMessage("player2-name",e.player2Name);else if("player1-name"===t.msg)e.setPlayer1Name(t.data);else if("player2-name"===t.msg)e.setPlayer2Name(t.data);else if("ask-game-started"===t.msg)e.sendMessage("game-started",e.gameStarted);else if("game-started"===t.msg)t.data&&(e.startGame(),e.sendMessage("ask-player1-name"),e.sendMessage("ask-player2-name"),e.sendMessage("ask-game-cells"),e.sendMessage("ask-player1-turn"),e.sendMessage("ask-peer-game-id"));else if("ask-game-cells"===t.msg)e.sendMessage("game-cells",e.cells);else if("game-cells"===t.msg)e.setCells(t.data);else if("player1-turn"===t.msg)e.setPlayer1Turn(t.data);else{if("ask-player1-turn"!==t.msg)return;e.sendMessage("player1-turn",e.player1Turn)}e.ackMessage(t)}}return Object(o.useEffect)((function(){for(var n=0;n<e.inMessages.length;n++)t(e.inMessages[n])}),[e.inMessages]),Object(o.useEffect)((function(){e.peerConnected&&(e.gameStarted||e.sendMessage("ask-game-started",{}))}),[e.peerConnected]),null})),oe=n(19),ce=n.n(oe);var ue=Object(C.b)((function(e){return e}))((function(e){return c.a.createElement("div",{className:"App"},c.a.createElement(te,null),c.a.createElement(re,null),c.a.createElement(ae,null),c.a.createElement("div",{className:"title"},"4 IN A ROW"),c.a.createElement("div",null,!e.gameStarted&&c.a.createElement($,null),e.gameStarted&&c.a.createElement(B,null)),localStorage.getItem("4inarow_debug")&&c.a.createElement(ce.a,{src:e}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var se=n(5),ie=n(20),le=n(9),fe=function(){return Object(le.a)(Array(6)).map((function(e){return new Array(7).fill("a")}))},de=fe();function me(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_CLIENT_ID":return t.clientId;default:return e}}function ge(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAME_STARTED":return!0;case"SHOW_START_SCREEN":return!1;default:return e}}function Ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_GAME_ID":return t.gameId;default:return e}}function pe(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SETUP_NEW_GAME":return!0;case"DONE_SETUP_GAME":return!1;default:return e}}function ve(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PEER_GAME_ID":return t.peerGameId;default:return e}}function ye(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_NETWORK_GAME":return t.isNetworkGame;default:return e}}function he(e,t){for(var n=5;n>=0&&"a"!==e[n][t];)n--;return n}function Ce(e,t){for(var n=0;n<6;n++)for(var r=0;r<7;r++)e[n][r]===t&&(e[n][r]="a")}function Se(e,t){Ce(e,t.color+"l");var n=he(e,t.j);return n<0?(console.log("Column does not have empty cell"),e):(e[n][t.j]=t.color,e.slice())}function Ne(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_PIECE":return Se(e,t);case"HIGHLIGHT":Ce(e,t.color+"l");var n=he(e,t.j);return n<0?e:(e[n][t.j]=t.color+"l",e.slice());case"GAME_STARTED":return fe();case"SET_CELLS":return t.cells;default:return e}}function Oe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHECK_END":return h(t.cells);case"GAME_STARTED":return 0;default:return e}}function _e(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_PLAYER":return!e;case"GAME_STARTED":return!0;case"SET_PLAYER1_TURN":return t.player1Turn;default:return e}}function be(e,t,n,r){return e.map((function(e){return function(e,t,n,r){if(e.id!==t)return e;var a=Object(ie.a)({},e);return a[n]=r,a}(e,t,n,r)}))}function we(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEND_MESSAGE":return[].concat(Object(le.a)(e),[{id:t.id,msg:t.msg,data:t.data}]);case"SENT_MESSAGE":return be(e,t.id,"sent",!0);default:return e}}function ke(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVED_MESSAGE":return[].concat(Object(le.a)(e),[{id:t.id,msg:t.msg,data:t.data}]);case"ACK_MESSAGE":return be(e,t.id,"ack",!0);default:return e}}function Te(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_HOST":return t.hostId;default:return e}}function Ie(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESET_SERVER_CONNECTION":return!1;case"SUCCESSFUL_SERVER_CONNECTION":return!0;default:return e}}function Ge(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESET_PEER_CONNECTION":return!1;case"SUCCESSFUL_PEER_CONNECTION":return!0;default:return e}}function Me(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Player 1",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PLAYER1_NAME":return t.name;default:return e}}function je(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Player 2",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PLAYER2_NAME":return t.name;default:return e}}var Re=Object(se.c)(Object(se.b)(a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C.a,{store:Re},c.a.createElement(ue,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.ccb9662e.chunk.js.map