import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import PostList from "../../components/posts/PostList";

import { getFeedByUser } from "../../api/feed";
import { getUserFB } from "../../api/user";

class HomeScreen extends Component {
  componentDidMount() {}

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
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedByUser: (id) => dispatch(getFeedByUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
