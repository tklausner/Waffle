import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import PostList from "../../components/posts/PostList";

import { getFeed } from "../../api/feed";

class HomeScreen extends Component {
  componentDidMount() {
    //ID=FEED_ID
    this.props.getFeed("5ed94f7e999fcc00041166d3");
    // PROBLEM BBECAUSE POSTS ARE NOT UNIQUE IN THIS FEED
  }
  render() {
    const { posts } = this.props.feed;
    return (
      <Container>
        {posts ? <PostList posts={posts} /> : <LoadingScreen />}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed.feed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeed: (id) => dispatch(getFeed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
