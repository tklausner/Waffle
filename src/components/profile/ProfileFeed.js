import React, { Component } from "react";
import { PostPreview } from "./PostPreview";
import { Container } from "native-base";
import { FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { getPost } from "../../api/post";

import { LoadingScreen } from "../loading/LoadingScreen";

class ProfileFeed extends Component {
  state = {
    feed: [],
  };
  componentDidMount() {
    const { posts } = this.props;
    if (posts) {
      for (id of posts) {
        this.loadPost(id);
      }
    }
  }

  loadPost = async (id) => {
    await this.props.getPost(id);
    const { post } = this.props;
    if (post) {
      this.setState((state) => ({
        feed: [...state.feed, { image: post.image, _id: post._id }],
      }));
    }
  };
  _renderItem = ({ item }) => {
    return <PostPreview post={item} key={item._id} route={this.props.route} />;
  };
  render() {
    return (
      <Container>
        {this.props.posts &&
        this.state.feed.length === this.props.posts.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => null}
            numColumns={2}
            style={{ flex: 1, marginLeft: 20 }}
            windowSize={6}
            initialNumToRender={6}
          />
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post_id) => dispatch(getPost(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed);
