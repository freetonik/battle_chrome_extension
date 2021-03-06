import React, { Component } from "react";
import OpenedGame from "./OpenedGame";

export default class OpenedGames extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentWillMount() {
    this.getMessagesFromServer.apply(this);
    setInterval(this.getMessagesFromServer.bind(this), 500);
  }

  getMessagesFromServer() {
    let messages = chrome.extension.getBackgroundPage().messages;
    if (messages)
      this.setState({messages: messages[this.props.type]});
  }

  render() {
    const messages = this.state.messages;
    return (
      <dl>
        <dt>
          <h4>Open games <span className="badge">{messages.length}</span></h4>
        </dt>

        {
          messages.length > 0 ?
            messages.map((message) => {
            return (
              <dd><OpenedGame key={message.game.id} message={message} /></dd>
              );
          }, this)
            : ""
        }
      </dl>
    );
  }
};

OpenedGames.propTypes = { type: React.PropTypes.string.isRequired };
