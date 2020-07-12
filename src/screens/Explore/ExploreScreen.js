import React, { Component } from "react";
import { Header, Item, Icon, Input, Container } from "native-base";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import ExploreList from "../../components/explore/ExploreList";
import { getExploreByUser, getExplore } from "../../api/explore";

class ExploreScreen extends Component {
  componentDidMount() {
    /**
    const { _id } = this.props.user;
    if (_id) {
      this.props.getExploreByUser(_id);
    }
    */

    //* SET GET EXPLORE FEED TO SINGLE ACCOUNT  */
    this.props.getExplore("5ee57ff51555a90004d75811");
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          {this.props.explore.category_list ? (
            <ExploreList category_list={this.props.explore.category_list} />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
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
    getExplore: (id) => dispatch(getExplore(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
