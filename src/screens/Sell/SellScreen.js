import React, { Component } from "react";
import { Container, Content, Button } from "native-base";

import { newPost } from "../../api/post";

import { connect } from "react-redux";

class SellScreen extends Component {
  state = {
    username: "NEW!",
    profile: require("../../../assets/images/ethan.jpeg"),
    description: "NEW!",
    value: 32,
    waffles_remaining: 32,
  };

  render() {
    return (
      <Container>
        <Button onPress={() => this.props.newPost(this.state)}></Button>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(newPost(post)),
  };
};
export default connect(null, mapDispatchToProps)(SellScreen);
