import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { PostList } from "../../components/posts/PostList";

import { readPosts } from "../../api/post";
class HomeScreen extends Component {
  componentDidMount() {
    this.props.readPosts();
  }
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

const mapDispatchToProps = (dispatch) => {
  return {
    readPosts: () => dispatch(readPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
