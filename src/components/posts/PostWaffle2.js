import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image, Picker } from "react-native";
import { Button, Text, Container } from "native-base";
import { connect } from "react-redux";
import WaffleIcon from "../../../assets/images/OnlineLogo.png";
import Swipeout from "react-native-swipeout";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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
      hidePrice: true,
      showWaffle: false,
    };
  }

  picker_number() {
    return (
      <TextInput
        style={[styles.waffleStyle, styles.pickerNumber]}
        placeholder="1"
        keyboardAppearance={"dark"}
        keyboardType={"number-pad"}
        placeholderTextColor={styles.buttonText}
        value={this.state.number_of_spots}
        maxLength={2}
        onChangeText={(text) => {
          this.setState({ number_of_spots: Number(text) });
        }}
        onEndEditing={() => {
          this.state.waffleType === "Main"
            ? this.setState({
                price: this.state.number_of_spots * this.props.post.main_price,
              })
            : this.setState({
                price: this.state.number_of_spots * this.props.post.mini_price,
              });
        }}
      />
    );
  }

  componentDidUpdate() {
    if (this.props.handleState) {
      this.props.handleState(this.state);
    }
  }

  componentDidMount() {
    this._isMounted = true;
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
                    waffleType:
                      this.state.waffleType === "Main" ? "Mini" : "Main",
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
            {this.picker_number()}
            <Swipeable
              renderLeftActions={LeftAction}
              style={styles.priceContainer}
            >
              <View style={[styles.waffleStyle, styles.priceContainer]}>
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
    backgroundColor: "transparent",
    borderColor: "#00B8FA",
    marginRight: "5%",
  },
  waffleButton: {
    width: "100%",
    resizeMode: "contain",
    height: "120%",
  },
  waffleContainer: {
    width: 50,
    marginRight: "5%",
    paddingTop: 0,
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
    paddingLeft: "5%",
    paddingRight: "5%",
    borderColor: "#00B8FA",
    backgroundColor: "#FFF",
  },
  price: {
    fontSize: 32,
    color: "#999999",
    textAlign: "center",
  },
  swiped: {
    backgroundColor: "#FF0000",
    width: "100%",
    borderColor: "#FFF",
    borderRadius: 90,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
});

export default connect(null, null)(PostWaffle);
