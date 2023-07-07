import React from 'react';
import './style.css';
// import io from 'socket.io-client';
import io from 'socket.io-client';

export default class App extends React.PureComponent {

  componentDidMount() {
    console.log('event document');
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("Hi there!");

        }
      })
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Socket Client</h1>
        <input ref={(c) => (this.field = c)} placeholder="url socket" />

        <button onClick={() => this.onClick()}>Connect</button>
        <div style={{ height: 20 }} />
        <div>
          <button onClick={() => this.onUserConnect()} >User Connect</button>
        </div>


        <div>
          <input ref={c => this.field_title = c} placeholder='title' ></input>
          <input ref={c => this.field_message = c} placeholder='message' ></input>
          <input ref={c => this.field_group = c} placeholder='group' ></input>
          <button onClick={() => this.onPushNotification()}>push notification</button>
        </div>

        <textarea ref={c => this.field_event = c} style={{ height: 300, width: 400 }} />
      </div>
    );
  }

  onClick() {
    var url = this.field.value;
    if (url == '') return;
    this.socket = io(url);
    this.setupSocketEvent();
  }

  onUserConnect() {
    var user = {
      user_id: 1234, name_user: 'user@socket.test', store: 'H001', time_login: Date.now().toLocaleString(), group: ['H001', 'H002']
    }
    this.socket.emit('user_connected', user);
  }

  async onPushNotification() {
    var url = 'http://localhost:3000/api/v1/pushnotifi'
    var res = await fetch(url, {
      method: 'post', body: {
        title: this.field_title.value,
        message: this.field_message.value,
        group: this.field_group.value
      }
    });

    if (res.status == 200) {
      this.makeLogEvent('pushNotification.success')
    }
    else if (res.status != 200) { this.makeLogEvent('pushNotification.error') }

  }

  setupSocketEvent() {
    console.log(this.socket)
    this.socket.on('connect', () => {
      var str = `socket.connectId ${this.socket.id}`
      this.makeLogEvent(str);
      console.log(str);
    });

    this.socket.on('disconnect', () => {
      this.makeLogEvent('disconnected')
      console.log(`disconnected`);
    })

    this.socket.on('getalluserclient', (data) => {
      var user = data[data.length - 1];
      console.log('getalluserclient', data, user);

      var userLatest = `userLast ${user['user_id']}`
      this.makeLogEvent(userLatest)
    })

    this.socket.on('send-notifi', (data) => {
      var { title, message } = data;
      this.makeLogEvent(`notification.reveice ${title} ${message}`)

      var notifi = new Notification(title, { body: message });
    })
  }


  makeLogEvent(string) {
    this.field_event.value += `${string} \n`
  }

}
