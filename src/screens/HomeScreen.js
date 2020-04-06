import React, { Component } from "react";
import { Container, Content } from "native-base";

import { PostW } from "../components/PostW";
import { HeaderW } from "../components/HeaderW";
import { FooterW } from "../components/FooterW";
export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <HeaderW />
        <Content>
          <PostW username="tklauklau" />
          <PostW username="ktlautlau" />
        </Content>
        <FooterW />
      </Container>
    );
  }
}
module.export = HomeScreen;
