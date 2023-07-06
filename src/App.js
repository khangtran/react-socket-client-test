import React from 'react';
import './style.css';
// import io from 'socket.io-client';
import io from 'socket.io-client';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Socket Client</h1>
        <input ref={(c) => (this.field = c)} placeholder="url socket" />

        <button onClick={() => this.onClick()}>Connect</button>
      </div>
    );
  }

  onClick() {
    var url = this.field.value;
    if (url == '') return;
    this.socket = io(url);
    this.setupSocketEvent();
  }

  setupSocketEvent() {
    console.log(this.socket)
    this.socket.on('connect', () => {
      console.log(`socket.connectId ${this.socket.id}`);
    });
  }
}
