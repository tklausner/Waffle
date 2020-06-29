import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";
import { Waffle } from "../../components/waffles/Waffle";

import globalStyles from "../../styles";

class WaffleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handler = this.handler.bind(this);
  }
  handler(data) {
    this.setState({ data: data });
  }
  render() {
    return (
      <Container>
        <Waffle
          dataPass={this.state.data}
          post={this.props.route.params.post}
          tempUser={this.props.route.params.tempUser}
          handler={this.handler}
        />
      </Container>
    );
  }
}
export default WaffleScreen;
