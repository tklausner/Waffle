import React, { Component } from "react";
import { Container, Content } from "native-base";

import { PostW } from "../components/PostW";
export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <PostW
            username="tklauklau"
            profile={require("../../assets/images/teddy.png")}
            image={require("../../assets/images/bing.png")}
            description="Chernobyl x Colbalt"
          />
          <PostW
            username="mimi>gaby"
            profile={require("../../assets/images/ethan.jpeg")}
            image={require("../../assets/images/ethan.jpeg")}
            description="Too cool for miami chicks"
          />
          <PostW
            username="RoorRus"
            profile={require("../../assets/images/teddy.png")}
            image={require("../../assets/images/roor.jpeg")}
            description="GOD shining his light"
          />
        </Content>
      </Container>
    );
  }
}
module.export = HomeScreen;
