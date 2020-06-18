import React, { Component } from "react";
import { ProductList } from "./ProductList";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { LoadingScreen } from "../loading/LoadingScreen";

import { connect } from "react-redux";
import { readPostsByCategory } from "../../api/post";

class ExploreList extends Component {
  _isMounted = false;
  state = {
    feed: [],
    isRefreshing: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.onRefresh();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadPosts = async (category, id) => {
    await this.props.readPostsByCategory(category);
    const { previews } = this.props;
    if (this._isMounted) {
      this.setState((state) => ({
        feed: [
          ...state.feed,
          { key: id.toString(), category: category, previews: previews },
        ],
      }));
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <ProductList
        products={item.previews}
        category={item.category}
        key={item.key}
      />
    );
  };

  async onRefresh() {
    this.setState({ isRefreshing: true, feed: [] });
    const { category_list } = this.props;
    for (let i = 0; i < category_list.length; i += 1) {
      this.loadPosts(category_list[i], i);
    }
    this.setState({ isRefreshing: false });
  }

  render() {
    return (
      <Container>
        {this.state.feed.length >= this.props.category_list.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            ListEmptyComponent={() => <Text>There are no categories?</Text>}
            keyExtractor={(item) => item.key}
            windowSize={8}
            removeClippedSubviews={true}
            initialNumToRender={4}
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
    previews: state.post.previews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readPostsByCategory: (category) => dispatch(readPostsByCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreList);
