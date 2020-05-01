import React, { Component } from "react";
import { Container, Content } from "native-base";

import { PostW } from "../components/PostW";
export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <PostW username="tklauklau" />
          <PostW username="ktlautlau" />
        </Content>
      </Container>
    );
  }
}
module.export = HomeScreen;
