import React, { Component, useState, useEffect } from "react";
import { Container, Content, Button } from "native-base";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { uploadImageToFireBase } from "../../utils";

import { newPost } from "../../api/post";

import { connect } from "react-redux";

class SellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      image: Asset.fromModule(require("../../../assets/images/CameraRoll.png"))
        .uri,
      description: "",
      postingPrice: 0,
      yourProfit: 0,
      mainSpots: 10,
      mainPrice: 0,
      minis: false,
    };
  }

  async componentDidMount() {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      this.setState({ hasCameraPermission: status === "granted" });
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  pickImage = async () => {
    Keyboard.dismiss();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      uploadImageToFireBase({
        uri: this.state.image,
      });
    }
  };

  takePicture = async () => {
    Keyboard.dismiss();
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        uploadImageToFireBase({
          uri: this.state.image,
        });
      }
    }
  };

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    } else {
      return (
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          accessible={false}
          activeOpacity={1}
        >
          <KeyboardAwareScrollView
            style={{ backgroundColor: "white" }}
            contentContainerStyle={styles.view}
            extraHeight={100}
            keyboardOpeningTime={0}
          >
            <View style={styles.imageContainer}>
              {this.state.image && (
                <Image
                  source={{ uri: this.state.image }}
                  style={styles.image}
                />
              )}
            </View>
            <View style={styles.innerView}>
              <Button transparent>
                <View style={styles.outerButtonView}>
                  <Ionicons name="ios-color-filter" style={styles.icon} />
                </View>
              </Button>
              <Button transparent onPress={this.takePicture}>
                <View style={styles.centerButtonView}>
                  <Ionicons name="ios-camera" style={styles.centerIcon} />
                </View>
              </Button>
              <Button transparent onPress={this.pickImage}>
                <View style={styles.outerButtonView}>
                  <Ionicons name="md-images" style={styles.icon} />
                </View>
              </Button>
            </View>
            <View style={{ width: "100%", marginLeft: "5%" }}>
              <Text style={styles.descriptionText}>Description</Text>
              <TextInput
                style={styles.form}
                placeholder="Write your description..."
                autoCorrect={true}
                keyboardAppearance={"dark"}
                placeholderTextColor={"white"}
                multiline={true}
                textAlignVertical={"top"}
                value={this.state.description}
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
              />
            </View>
              <View style={styles.secondaryView}>
                <Text style={styles.textStyle}>Posting Price:</Text>
                <TextInput
                  style={styles.secondaryInput}
                  placeholder=""
                  keyboardAppearance={"dark"}
                  keyboardType={"number-pad"}
                  placeholderTextColor={"black"}
                  value={this.state.postingPrice}
                  onChangeText={(text) => {
                    this.setState({ postingPrice: Number(text) });
                  }}
                  onEndEditing={() => {
                    this.setState({
                      yourProfit: this.state.postingPrice * 0.99,
                    });
                    this.setState({
                      mainPrice: this.state.postingPrice / this.state.mainSpots,
                    });
                  }}
                />
              </View>
              <View style={styles.secondaryView}>
                <Text style={styles.textStyle}>Your Profit:</Text>
                <Text style={styles.changingText}>{this.state.yourProfit}</Text>
              </View>
              <View style={styles.secondaryView}>
                <Text style={styles.textStyle}>Main Spots:</Text>
                <TextInput
                  style={styles.secondaryInput}
                  placeholder="10"
                  keyboardAppearance={"dark"}
                  keyboardType={"number-pad"}
                  placeholderTextColor={"grey"}
                  value={this.state.mainSpots}
                  onChangeText={(text) => {
                    this.setState({ mainSpots: Number(text) });
                  }}
                  onEndEditing={() => {
                    this.setState({
                      mainPrice: this.state.postingPrice / this.state.mainSpots,
                    });
                  }}
                />
              </View>
              <View style={styles.secondaryView}>
                <Text style={styles.textStyle}>Main Price:</Text>
                <Text style={styles.changingText}>{this.state.mainPrice}</Text>
              </View>
            <Button style={styles.waffleButton}>
              <Text style={styles.waffleText}>Waffle</Text>
            </Button>
          </KeyboardAwareScrollView>
        </TouchableOpacity>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(newPost(post)),
  };
};
export default connect(null, mapDispatchToProps)(SellScreen);

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    borderRadius: 2,
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    alignSelf: "flex-start",
    marginLeft: "2%",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#00B8FA",
  },
  form: {
    width: "95%",
    borderRadius: 4,
    height: 120,
    justifyContent: "center",
    backgroundColor: "#999999",
    color: "white",
    fontSize: 16,
    paddingLeft: 8,
    marginBottom: 10,
  },
  innerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "70%",
    height: 100,
  },
  icon: {
    fontSize: 50,
    color: "black",
  },
  centerIcon: {
    fontSize: 80,
    color: "black",
  },
  centerButtonView: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    height: 85,
    width: 85,
  },
  outerButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
  },
  secondaryView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "70%",
    height: 50,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#00B8FA",
  },
  secondaryInput: {
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    fontSize: 18,
    width: 50,
    paddingLeft: 3,
  },
  changingText: {
    fontSize: 18,
  },
  waffleButton: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#00B8FA",
    marginTop: 10,
  },
  waffleText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  }
});
