import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Asset } from "expo-asset";

import { newPost } from "../../api/post";

import { connect } from "react-redux";

class SellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      image: Asset.fromModule(require("../../../assets/images/CameraRoll.png"))
        .uri,
      postState: {
        username: "NEW!",
        profile: require("../../../assets/images/ethan.jpeg"),
        description: "NEW!",
        value: 32,
        waffles_remaining: 32,
      },
    };
    this.postState = {};
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    } else if (this.state.hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    } else {
      return (
        <Container>
          <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.view}>
                <TouchableOpacity
                  onPress={this.pickImage}
                  style={styles.imageContainer}
                >
                  {this.state.image && (
                    <Image
                      source={{ uri: this.state.image }}
                      style={styles.image}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.descriptionText}>Description</Text>
                <TextInput
                  style={styles.form}
                  placeholder="Write your description..."
                  autoCorrect={true}
                  keyboardAppearance={"dark"}
                  placeholderTextColor={"white"}
                  multiline={true}
                  textAlignVertical={"top"}
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Container>
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
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#00B8FA",
    marginTop: 10,
  },
  form: {
    borderWidth: 0,
    width: "95%",
    borderRadius: 4,
    height: 120,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#999999",
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
  },
});
