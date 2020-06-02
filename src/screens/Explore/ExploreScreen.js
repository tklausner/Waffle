import React, { Component } from "react";
import { Container, Content, Body, Text, Button } from "native-base";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

import { ProductList } from "../../components/explore/ProductList";
import { ExploreList } from "../../components/explore/ExploreList";

class ExploreScreen extends Component {
  render() {
    const { products } = this.props;
    return <ExploreList products={products} />;
    //return <ProductList products={products} />;
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    products: state.post.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, null)(ExploreScreen);
