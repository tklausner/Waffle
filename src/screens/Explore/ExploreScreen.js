import React, { Component } from "react";
import { Container, Content, Body, Text, Button } from "native-base";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

import ExploreList from "../../components/explore/ExploreList";

import { readPostsByCategory } from "../../api/post";
class ExploreScreen extends Component {
  state = {
    category_list: [
      { id: "1", category: "tech" },
      { id: "2", category: "animals" },
      { id: "3", category: "tech" },
      { id: "4", category: "animals" },
      { id: "5", category: "trash" },
    ],
  };
  render() {
    const { category_list } = this.state;
    return <ExploreList category_list={category_list} />;
  }
}

const styles = StyleSheet.create({});

const mapDispatchToProps = (dispatch) => {
  return {
    readPostsByCategory: (category) => dispatch(readPostsByCategory(category)),
  };
};

export default connect(null, null)(ExploreScreen);
