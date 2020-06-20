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
      waffleType: "",
      number_of_spots: 0,
      price: 0,
      hidePrice: true,
      showWaffle: false,
    };
  }

  picker_number() {
    return (
      <TextInput
        style={styles.pickerNumber}
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
          <View>
            <View style={styles.container}>
              <Button
                rounded
                style={
                  this.state.waffleType === "Main"
                    ? styles.selectedWaffleType
                    : styles.waffleTypeButton
                }
                onPress={() => {
                  if (this._isMounted)
                    this.setState({
                      waffleType: "Main",
                    });
                }}
              >
                <Text style={styles.waffleTypeText}>Main</Text>
              </Button>

              <Button
                rounded
                style={
                  this.state.waffleType === "Mini"
                    ? styles.selectedWaffleType
                    : styles.waffleTypeButton
                }
                onPress={() => {
                  if (this._isMounted)
                    this.setState({
                      waffleType: "Mini",
                    });
                }}
              >
                <Text style={styles.waffleTypeText}>Mini</Text>
              </Button>
              {this.picker_number()}
            </View>
            <Swipeable renderLeftActions={LeftAction}>
              <View style={styles.priceView}>
                <Text style={styles.priceText}>${this.state.price}</Text>
              </View>
            </Swipeable>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedWaffleType: {
    backgroundColor: "#00B8FA",
    borderWidth: 4,
    borderColor: "#00B8FA",
    marginRight: "5%",
  },
  waffleTypeButton: {
    backgroundColor: "transparent",
    borderColor: "#00B8FA",
    marginRight: "5%",
    borderWidth: 3,
    borderColor: "#00B8FA",
    borderRadius: 90,
    borderTopWidth: 0,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
  waffleTypeText: {
    fontSize: 24,
    color: "#DDD",
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
    borderRadius: 90,
    width: 60,
    height: 45,
    fontSize: 32,
    textAlign: "center",
    color: "#00B8FA",
    marginRight: "5%",
    borderTopWidth: 0,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    borderBottomWidth: 3,
  },
  priceView: {
    borderWidth: 3,
    borderColor: "#00B8FA",
    borderRadius: 10,
    width: "50%",
    height: 45,
    marginTop: "5%",
    marginLeft: "25%",
    paddingTop: 5,
    color: "#00B8FA",
  },
  priceText: {
    fontSize: 32,
    color: "#555",
    textAlign: "center",
    height: 45,
  },
  swiped: {
    backgroundColor: "#00B8FA",
    borderRadius: 10,
    width: "50%",
    height: 45,
    marginTop: "5%",
    paddingTop: 5,
    marginLeft: "30%",
  },
});

export default connect(null, null)(PostWaffle);
