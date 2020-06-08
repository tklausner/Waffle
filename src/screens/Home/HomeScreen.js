import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import PostList from "../../components/posts/PostList";

import { getFeedByUser } from "../../api/feed";
import { getUserFB } from "../../api/user";

class HomeScreen extends Component {
  componentDidMount() {
    this._loadUser();
  }

  async _loadUser() {
    await this.props.getUserFB("0Z1rLUJc8ZXV1OONn9ptOuegFOf1");
    const { _id } = this.props.user;
    this.props.getFeedByUser(_id);
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
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedByUser: (id) => dispatch(getFeedByUser(id)),
    getUserFB: (id) => dispatch(getUserFB(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
