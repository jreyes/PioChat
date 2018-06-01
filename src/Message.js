import React from 'react';
import 'materialize-css';
import './Wave';

const $ = require('jquery');


class Message extends React.Component {

  componentDidMount() {
    $(this.refs.message).children().waveText();
  }

  splitLines(arr, msg) {
    msg = msg.trim();
    if (msg.length < 55) {
      arr.push(msg);
      return arr;
    }
    let emptyIndex = msg.substring(0, 55).lastIndexOf(" ");
    arr.push(msg.substring(0, emptyIndex));
    return this.splitLines(arr, msg.substring(emptyIndex));
  }

  calculateWidth(arr) {
    let size = 0;
    for (let i = 0; i < arr.length; i++) {
      if (size < arr[i].length * 20) {
        size = arr[i].length * 20;
      }
    }
    return (size + 40) + 'px';
  }

  decorateMessage() {
    const tweetyId = Math.floor(Math.random() * 5) + 1;
    const sylvesterId = Math.floor(Math.random() * 5) + 1;
    return 'chat-message tweety tweety-' + tweetyId + ' sylvester sylvester-' + sylvesterId;
  }

  render() {
    const lines = this.splitLines([], this.props.chat.content);
    const rows = lines.map((line, index) =>
      <div key={index}>{line}</div>
    );
    return <div className={this.props.index % 2 === 0 ? "me" : "them"}>
      <div className={this.decorateMessage()} ref="message" style={{width: this.calculateWidth(lines)}}>{rows}</div>
    </div>
  }
}

export default Message;