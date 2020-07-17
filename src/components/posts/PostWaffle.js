import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  Animated,
} from "react-native";
import { Button, Text, Container } from "native-base";
import { connect } from "react-redux";
import WaffleIcon from "../../../assets/images/icon-128.png";
import Swipeout from "react-native-swipeout";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { updatePost, getPost } from "../../api/post";
import { updateUser } from "../../api/user";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class PostWaffle extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      waffleType: "Main",
      number_of_spots: 0,
      price: 0,
      showWaffle: false,
      waffles_remaining: 0,
    };
  }

  number_button() {
    return (
      <Button
        transparent
        style={styles.pickerNumber}
        onPress={() => {
          this.quickPurchase();
        }}
      >
        <Text
          style={{
            color: "#00B8FA",
            fontSize: 28,
            fontWeight: "600",
            marginLeft: "-5%",
          }}
        >
          {this.state.number_of_spots}
        </Text>
      </Button>
    );
  }

  picker_number() {
    const { post } = this.props;
    return (
      <TextInput
        style={[styles.waffleStyle, styles.pickerNumber]}
        placeholder="1"
        keyboardAppearance={"dark"}
        keyboardType={"number-pad"}
        value={this.state.number_of_spots.toString()}
        maxLength={2}
        onChangeText={(text) => {
          this.setState({ number_of_spots: Number(text) });
        }}
        onEndEditing={() => {
          this.state.waffleType === "Main"
            ? this.setState({
                price: this.state.number_of_spots * post.main_price,
              })
            : this.setState({
                price: this.state.number_of_spots * post.mini_price,
              });
        }}
      />
    );
  }

  async addWaffleToUser() {
    if (this._isMounted) {
      let updatedWaffles = this.props.user.waffles.slice();
      updatedWaffles.splice(updatedWaffles.length - 1, 0, this.props.post._id);
      await this.props.updateUser({
        _id: this.props.user._id,
        waffles: updatedWaffles,
      });
    }
  }

  async quickPurchase() {
    const { post } = this.props;
    if (
      this.state.number_of_spots > 0 &&
      this.state.price > 0 &&
      this.state.number_of_spots <= post.waffles_remaining
    ) {
      let data = post.wafflers.slice();
      for (let i = 0, j = 0, k = 0; j < this.state.number_of_spots; i++) {
        if (post.wafflers[k]) {
          if (i != post.wafflers[k]["spot_number"]) {
            data.splice(data.length - 1, 0, {
              spot_number: i,
              username: this.props.user.username,
              user_id: this.props.user._id,
            });
            j += 1;
          } else {
            k += 1;
          }
        } else {
          data.splice(data.length - 1, 0, {
            spot_number: i,
            username: this.props.user.username,
            user_id: this.props.user._id,
          });
          j += 1;
        }
      }

      data.sort((a, b) => (a.spot_number > b.spot_number ? 1 : -1));
      await this.props.updatePost({
        _id: post._id,
        wafflers: data,
        waffles_remaining: post.waffles_remaining - this.state.number_of_spots,
      });
      this.addWaffleToUser();
    }
    this.setState({
      showWaffle: false,
      waffles_remaining: post.waffles_remaining - this.state.number_of_spots,
    });
  }

  componentDidUpdate() {
    if (this.props.handleState) {
      this.props.handleState(this.state);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      waffles_remaining: this.props.post.waffles_remaining,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          transparent
          style={styles.waffleContainer}
          onPress={() => {
            this.setState({
              showWaffle: !this.state.showWaffle,
            });
          }}
        >
          <Image style={styles.waffleButton} source={WaffleIcon}></Image>
        </Button>

        {this.state.showWaffle ? (
          <View style={styles.container}>
            {this.number_button()}
            <View style={{ flexDirection: "row", marginLeft: "1%" }}>
              <Button
                transparent
                style={styles.changeSpot}
                onPress={() => {
                  this.setState({
                    number_of_spots: this.state.number_of_spots - 1,
                    price: this.state.price - 1,
                  });
                }}
              >
                <MaterialIcons
                  name="remove-circle-outline"
                  style={styles.changeSpotText}
                />
              </Button>
              <Button
                transparent
                style={styles.changeSpot}
                onPress={() => {
                  this.setState({
                    number_of_spots: this.state.number_of_spots + 1,
                    price: this.state.price + 1,
                  });
                }}
              >
                <MaterialIcons
                  name="add-circle-outline"
                  style={styles.changeSpotText}
                />
              </Button>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  waffleStyle: {
    borderRadius: 90,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    backgroundColor: "#fff",
  },
  waffleButton: {
    width: "100%",
    resizeMode: "contain",
    height: "120%",
    backgroundColor: "transparent",
  },
  waffleContainer: {
    width: 50,
    marginRight: "5%",
    paddingTop: 0,
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
  },
  changeSpot: {
    borderColor: "#00B8FA",
    textAlign: "center",
    width: 48,
    height: 48,
    marginRight: "-5%",
    backgroundColor: "transparent",
    borderRadius: 45,
    borderColor: "#00B8FA",
  },
  changeSpotText: {
    fontSize: 40,
    color: "#00B8FA",
    paddingLeft: "6%",
  },
  pickerNumber: {
    borderColor: "#00B8FA",
    borderWidth: 3,
    borderRadius: 45,
    width: 48,
    height: 48,
    textAlign: "center",
    color: "#00B8FA",
    marginRight: "5%",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post)),
    getPost: (id) => dispatch(getPost(id)),
    updateUser: (id) => dispatch(updateUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostWaffle);
