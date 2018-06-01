import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.js';

import './App.css';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [{
        content: "Hello World!"
      }, {
        content: "Love it! :heart:"
      }, {
        content: "Check out my Github at https://github.com/WigoHunter"
      }, {
        content: "Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enimid, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus."
      }, {
        content: "So"
      }]
    };
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.scrollToBot();
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    window.scrollTo(0, ReactDOM.findDOMNode(this.refs.chats).scrollHeight);
  }

  submitMessage(e) {
    e.preventDefault();

    this.setState({
      chats: this.state.chats.concat([{
        content: ReactDOM.findDOMNode(this.refs.msg).value,
      }])
    }, () => ReactDOM.findDOMNode(this.refs.msg).value = "");

    this.scrollToBot();
  }

  render() {
    const {chats} = this.state;
    return (
      <div className="chatroom"  ref="chats">
        <div className="chats">
          {chats.map((chat, index) => <Message chat={chat} index={index} key={index}/>)}
        </div>
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card-panel">
              <div className="row">
                <form className="col s12" onSubmit={(e) => this.submitMessage(e)}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="input_text" type="text" data-length="100" ref="msg"/>
                      <label htmlFor="input_text">Mensaje</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button className="btn waves-effect waves-light right" type="submit" ref="submit">Enviar
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatroom;
