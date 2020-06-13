import React, { PureComponent } from "react";
import Post from "./Post";
import { Container } from "native-base";
import { FlatList, StyleSheet, RefreshControl, Text } from "react-native";

import { connect } from "react-redux";
import { getPost, readPosts } from "../../api/post";

import { LoadingScreen } from "../../components/loading/LoadingScreen";

class PostList extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.readPosts();
    /** FOR PERSONALIZED FEEDS
    const { posts } = this.props;
    for (id of posts) {
      this.loadPost(id);
    }
    */
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.props.readPosts();
    this.setState({ isRefreshing: false });
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
        {true || this.state.feed.length === this.props.posts.length ? (
          <FlatList
            data={this.props.posts}
            renderItem={this._renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => <Text>You have no posts!</Text>}
            windowSize={10}
            removeClippedSubviews={true}
            initialNumToRender={2}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
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
    posts: state.post.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post_id) => dispatch(getPost(post_id)),
    readPosts: () => dispatch(readPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
