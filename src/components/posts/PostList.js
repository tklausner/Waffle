import React, { Component } from "react";
import { Post } from "./Post";
import { Container } from "native-base";
import { FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { getPost } from "../../api/post";

import { LoadingScreen } from "../../components/loading/LoadingScreen";

class PostList extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { posts } = this.props;
    for (id of posts) {
      this.loadPost(id);
    }
  }
  loadPost = async (id) => {
    await this.props.getPost(id);
    const { post } = this.props;
    if (this._isMounted) {
      this.setState((state) => ({
        feed: [...state.feed, post],
      }));
    }
  };
  _renderItem = ({ item }) => {
    return <Post post={item} key={item._id} />;
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Container>
        {this.state.feed.length === this.props.posts.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => <Text>Ethan's a Bitch</Text>}
          />
        ) : (
          <LoadingScreen />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
