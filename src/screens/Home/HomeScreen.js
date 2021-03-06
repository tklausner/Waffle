import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import PostList from "../../components/posts/PostList";

import { getFeedByUser } from "../../api/feed";

class HomeScreen extends Component {
  componentDidMount() {
    /** FOR INDIVIDUALIZED FEEDS
    const { _id } = this.props.user;
    if (_id) {
      this.props.getFeedByUser(_id);
    }
    */
  }

  render() {
    /** FOR INDIVIDUALIZED FEEDS
    const { posts } = this.props.feed;
    */
    return <Container>{true ? <PostList /> : <LoadingScreen />}</Container>;
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

export default connect(null, null)(HomeScreen);
