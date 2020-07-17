import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "native-base";

import globalStyles from "../../styles";

import { EmptyScreen } from "../../components/loading/EmptyScreen";

import { connect } from "react-redux";

class Waffle extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _userWaffles() {
    const { user } = this.props;
    let index = user.waffles.findIndex(
      (i) => i.post_id === this.props.post._id
    );
    if (index < 0) {
      return <Text style={styles.userWaffle}>{`@${user.username}: 0`}</Text>;
    }
    return (
      <Text
        style={styles.userWaffle}
      >{`@${user.username}: ${user.waffles[index].spots}`}</Text>
    );
  }

  _topWafflers() {
    let size = this.props.post.wafflers.length;
    console.log(size);
    let topWafflers = this.props.post.wafflers.slice(size - 5);
    return topWafflers.map((w) => {
      return (
        <Text
          style={styles.topWafflers}
        >{`@${w.username}: ${w.spot_number}`}</Text>
      );
    });
  }

  render() {
    const { wafflers } = this.props.post;
    return wafflers.length > 0 ? (
      <View>
        <View>
          <Text style={styles.userWafflesText}>My Donations</Text>
          {this._userWaffles()}
        </View>
        <View style={{ marginTop: "5%" }}>
          <Text style={styles.userWafflesText}>Top Donors</Text>
          {this._topWafflers()}
        </View>
      </View>
    ) : (
      <EmptyScreen />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    winner: state.post.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, null)(Waffle);

const styles = StyleSheet.create({
  userWaffle: {
    padding: "2%",
    width: 250,
    borderWidth: 3,
    borderColor: globalStyles.wBlue.color,
    borderRadius: 7,
    fontWeight: "600",
    marginLeft: "5%",
  },
  userWafflesText: {
    fontWeight: "600",
    marginLeft: "5%",
    color: "#222",
    marginBottom: "2%",
  },
  topWafflers: {
    borderWidth: 3,
    borderColor: globalStyles.wYellow.color,
    borderRadius: 7,
    fontWeight: "600",
    padding: "2%",
    marginBottom: "2%",
    marginRight: "50%",
    marginLeft: "5%",
  },
});
