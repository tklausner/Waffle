import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { PostList } from "../components/PostList";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("PROPS");

    const { posts } = this.props;
    console.log(posts);
    return (
      <Container>
        <PostList posts={posts} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps)(HomeScreen);
