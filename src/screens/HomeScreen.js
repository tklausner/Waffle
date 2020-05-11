import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { PostList } from "../components/PostList";
class HomeScreen extends Component {
  render() {
    const { posts } = this.props;
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
