import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { PostList } from "../components/PostList";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("PROPS");

    const { posts } = this.props;
    console.log(this.store);
    console.log("POSTS");
    console.log(this);
    return (
      <Container>
        <PostList posts={posts} />
      </Container>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    posts: store.post.posts,
  };
};

module.export = connect(mapStateToProps)(HomeScreen);
