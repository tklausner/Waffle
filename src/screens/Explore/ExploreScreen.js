import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import ExploreList from "../../components/explore/ExploreList";
import { getExploreByUser } from "../../api/explore";

import { Container } from "native-base";

class ExploreScreen extends Component {
  componentDidMount() {
    const { _id } = this.props.user;
    if (_id) {
      this.props.getExploreByUser(_id);
    }
  }

  render() {
    const { category_list } = this.props.explore;
    return category_list ? <ExploreList category_list={category_list} /> : null;
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    explore: state.explore.explore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExploreByUser: (id) => dispatch(getExploreByUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
