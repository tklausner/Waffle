import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";
import { connect } from "react-redux";

import { MessageList } from "../components/MessageList";

import globalStyles from "../styles";

class MessagingPreviewScreen extends Component {
  render() {
    const { messages } = this.props;
    return (
      <Container>
        <MessageList messages={messages} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.message.messages,
  };
};

export default connect(mapStateToProps)(MessagingPreviewScreen);
