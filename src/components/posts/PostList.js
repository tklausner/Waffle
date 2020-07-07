import React, { PureComponent } from "react";
import Post from "./Post";
import { Container } from "native-base";
import { FlatList, StyleSheet, RefreshControl, Text } from "react-native";

import { connect } from "react-redux";
import { getPost, readPosts } from "../../api/post";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import { NavigationContext } from "@react-navigation/native";

class PostList extends PureComponent {
  static contextType = NavigationContext;

  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isRefreshing: false,
      posts: [],
      rerender: false,
    };
  }

  async componentDidMount() {
    const navigation = this.context;
    this._unsubscribe = navigation.addListener("focus", async (res) => {
      this.setState({
        rerender: true,
      });
      this.onRefresh();
    });
    this._isMounted = true;
    await this.props.readPosts();
    this.setState({ posts: this.props.posts.reverse() });
    this.setState({
      rerender: false,
    });
  }

  async onRefresh() {
    console.log("refresh");
    this.setState({ isRefreshing: true });
    await this.props.readPosts();
    await this.setState({ posts: this.props.posts.reverse() });
    this.setState({ isRefreshing: false, rerender: false });
  }

  loadPost = async (id) => {
    if (this._isMounted) {
      await this.props.getPost(id);
      const { post } = this.props;
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
    this._unsubscribe();
  }
  render() {
    return !this.state.rerender ? (
      <Container>
        {this.state.posts ||
        this.state.feed.length === this.state.posts.length ? (
          <FlatList
            data={this.state.posts}
            renderItem={this._renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => <Text>You have no posts!</Text>}
            windowSize={4}
            removeClippedSubviews={false}
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
    ) : (
      <LoadingScreen />
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
