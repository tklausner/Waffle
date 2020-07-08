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
import WaffleIcon from "../../../assets/images/OnlineLogo.png";
import Swipeout from "react-native-swipeout";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { updatePost, getPost } from "../../api/post";

const LeftAction = () => {
  return <View style={styles.swiped}></View>;
};

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

  main_mini() {
    return (
      <Button
        rounded
        style={
          this.state.waffleType === "Main"
            ? [styles.waffleStyle, styles.miniSelected]
            : [styles.waffleStyle, styles.mainSelected]
        }
        onPress={() => {
          if (this._isMounted)
            this.setState({
              waffleType: this.state.waffleType === "Main" ? "Mini" : "Main",
            });
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: this.state.waffleType === "Main" ? "#00B8FA" : "#DDD",
          }}
        >
          {this.state.waffleType}
        </Text>
      </Button>
    );
  }

  async quickPurchase() {
    const { post } = this.props;
    if (this.state.number_of_spots > 0 && this.state.price > 0) {
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
            {this.picker_number()}
            <Swipeable
              renderLeftActions={LeftAction}
              onSwipeableLeftOpen={this.quickPurchase.bind(this)}
              friction={1.5}
              style={styles.priceContainer}
            >
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${this.state.price}</Text>
              </View>
            </Swipeable>
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
  },
  mainSelected: {
    backgroundColor: "#00B8FA",
    marginRight: "5%",
    borderColor: "#DDD",
  },
  miniSelected: {
    backgroundColor: "#FFF",
    borderColor: "#00B8FA",
    marginRight: "5%",
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
  pickerNumber: {
    borderColor: "#00B8FA",
    width: 60,
    height: 45,
    fontSize: 32,
    textAlign: "center",
    color: "#00B8FA",
    marginRight: "5%",
  },
  priceContainer: {
    width: "100%",
    marginTop: "0%",
    paddingLeft: "5%",
    paddingRight: "50%",
    borderColor: "#EACD2E",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
  },
  price: {
    fontSize: 32,
    color: "#222",
    opacity: 0.8,
    textAlign: "left",
  },
  swiped: {
    backgroundColor: "#EACD2E",
    width: "100%",
    borderColor: "#FFF",
    borderRadius: 10,
    borderWidth: 2,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostWaffle);
