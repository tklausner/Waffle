import React, { Component } from "react";
import { ProductList } from "./ProductList";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import { LoadingScreen } from "../loading/LoadingScreen";

import { connect } from "react-redux";
import { readPostsByCategory } from "../../api/post";

class ExploreList extends Component {
  _isMounted = false;
  state = {
    feed: [[]],
  };

  componentDidMount() {
    this._isMounted = true;
    const { category_list } = this.props;
    for (let i = 0; i < category_list.length; i += 1) {
      this.loadPosts(category_list[i], i + 1);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadPosts = async (category, id) => {
    await this.props.readPostsByCategory(category);
    const { posts } = this.props;
    if (this._isMounted) {
      this.setState((state) => ({
        feed: [
          ...state.feed,
          { id: id.toString(), category: category, posts: posts },
        ],
      }));
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <ProductList
        products={item.posts}
        category={item.category}
        key={item.id}
      />
    );
  };
  render() {
    console.log("FEED", this.state.feed);
    return (
      <Container>
        {this.state.feed.length >= this.props.category_list.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => <Text>There are no categories?</Text>}
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
    posts: state.post.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readPostsByCategory: (category) => dispatch(readPostsByCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreList);
