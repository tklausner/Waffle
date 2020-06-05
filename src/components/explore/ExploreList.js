import React, { Component } from "react";
import { ProductList } from "./ProductList";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { readPostsByCategory } from "../../api/post";

class ExploreList extends Component {
  state = {
    feed: [[]],
  };

  componentDidMount() {
    const { category_list } = this.props;
    for (category of category_list) {
      this.loadPosts(category.category);
    }
  }

  loadPosts = async (category) => {
    await this.props.readPostsByCategory(category);
    const { posts } = this.props;
    this.setState((state) => ({
      feed: [...state.feed, { category: category, posts: posts }],
    }));
  };

  _renderItem = ({ item, index }) => {
    console.log("RENDERITEM", item);
    return (
      <ProductList
        products={item.posts}
        category={item.category}
        key={item.index}
      />
    );
  };
  render() {
    return (
      <Container>
        {this.state.feed.length === this.props.category_list.length ? (
          <FlatList
            data={this.state.feed}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.index}
            ListEmptyComponent={() => <Text>There are no categories?</Text>}
          />
        ) : null}
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
