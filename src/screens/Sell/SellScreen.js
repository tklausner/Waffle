import React, { Component, useState, useEffect } from "react";
import { Container, Content, Button, Spinner } from "native-base";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { Asset } from "react-native-unimodules";
import Ionicons from "react-native-vector-icons/Ionicons";
import globalStyles from "../../styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { uploadImageToFireBase, _processImage } from "../../utils";

import { newPost } from "../../api/post";
import { updateUser } from "../../api/user";

import { connect } from "react-redux";

import { NavigationContext } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import ImagePicker from "react-native-image-picker";

const contextType = NavigationContext;

class SellScreen extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      image: Asset.fromModule(
        require("../../../assets/images/CameraRollLight.png")
      ).uri,
      category: "",
      description: "",
      postingPrice: "",
      yourProfit: 0,
      mainSpots: "",
      mainPrice: 0,
      miniSpots: 0,
      miniPrice: 0,
      minis: false,
      uploading: false,
    };
  };

  onImagePick = async (res) => {
    if (res.error) {
      console.log("[ERROR]", res.error);
    } else if (res.didCancel) {
      console.log("User cancelled image picker");
    } else {
      console.log(res.uri);
      this.setState({
        image: res.uri,
      });
    }
  };

  pickImage = async () => {
    Keyboard.dismiss();
    await ImagePicker.launchImageLibrary(
      { mediaType: "photo", allowsEditing: true, quality: 1 },
      (callback = this.onImagePick)
    );
  };

  takePicture = async () => {
    Keyboard.dismiss();
    await ImagePicker.launchCamera(
      { mediaType: "photo", allowsEditing: true, quality: 1 },
      (callback = this.onImagePick)
    );
  };

  waffleUpload = async () => {
    const navigation = this.context;
    if (
      this.state.image ==
      Asset.fromModule(require("../../../assets/images/CameraRollLight.png"))
        .uri
    ) {
      Alert.alert("You must upload an image before posting");
    } else if (this.state.postingPrice <= 0) {
      Alert.alert("Posting price must be greater than $0");
    } else if (this.state.mainSpots <= 0 && this.state.mainSpots != "") {
      Alert.alert("You must have at least one spot in your main");
    } else {
      this.setState({ uploading: true });
      uploadImageToFireBase({
        uri: this.state.image,
      }).then(async (res) => {
        if (res) {
          const newPost = {
            user_id: this.props.user._id,
            username: this.props.user.username,
            category: this.state.category,
            image: _processImage(this.state.image),
            profile: this.props.user.profile,
            description: this.state.description,
            value: this.state.postingPrice,
            waffles_remaining: this.state.mainSpots,
            main_spots: this.state.mainSpots,
            mini_spots: this.state.miniSpots,
            main_price: this.state.mainPrice,
            mini_price: this.state.miniPrice,
          };
          await this.props.newPost(newPost);
          this.updateStore();
          await this.setState({ uploading: false });
          this._reset();
        } else {
          Alert.alert("Waffle Failed!");
        }
        navigation.navigate("Home");
      });
    }
  };

  _reset = () => {
    this.postingPrice_input.clear();
    this.mainSpots_input.clear();
    this.setState(this.getInitialState());
  };

  updateStore = () => {
    let updatedStore = this.props.user.store.slice();
    updatedStore.splice(updatedStore.length - 1, 0, this.props.post._id);
    const { _id } = this.props.user;
    this.props.updateUser({
      store: updatedStore,
      _id: _id,
    });
  };

  updatePrice = () => {
    this.setState({
      yourProfit: this.state.postingPrice * 0.99,
    });
    if (this.state.postingPrice == "") this.setState({ mainPrice: 0 });
    else if (this.state.mainSpots == "")
      this.setState({ mainPrice: this.state.postingPrice / 10 });
    else
      this.setState({
        mainPrice: this.state.postingPrice / this.state.mainSpots,
      });
  };

  render() {
    return !this.state.uploading ? (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white", flexGrow: 1 }}
        contentContainerStyle={styles.view}
        extraHeight={100}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {this.state.image && (
            <Image source={{ uri: this.state.image }} style={styles.image} />
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
          <Text style={styles.textStyle}>Category:</Text>
          <TextInput
            style={styles.tertiaryInput}
            keyboardAppearance={"dark"}
            placeholderTextColor={"grey"}
            value={this.state.category}
            maxLength={15}
            onChangeText={(text) => {
              this.setState({ category: text });
            }}
          />
        </View>
        <View style={styles.secondaryView}>
          <Text style={styles.textStyle}>Posting Price:</Text>
          <TextInput
            ref={(input) => {
              this.postingPrice_input = input;
            }}
            style={styles.secondaryInput}
            placeholder=""
            keyboardAppearance={"dark"}
            keyboardType={"number-pad"}
            placeholderTextColor={"black"}
            value={this.state.postingPrice.toString()}
            maxLength={4}
            onChangeText={(text) => {
              if (text == "") this.setState({ postingPrice: "" });
              else this.setState({ postingPrice: Number(text) });
            }}
            onEndEditing={this.updatePrice}
          />
        </View>
        <View style={styles.secondaryView}>
          <Text style={styles.textStyle}>Your Profit:</Text>
          <Text style={styles.changingText}>{this.state.yourProfit}</Text>
        </View>
        <View style={styles.secondaryView}>
          <Text style={styles.textStyle}>Main Spots:</Text>
          <TextInput
            ref={(input) => {
              this.mainSpots_input = input;
            }}
            style={styles.secondaryInput}
            placeholder="10"
            keyboardAppearance={"dark"}
            keyboardType={"number-pad"}
            placeholderTextColor={"grey"}
            keyboardType={"numeric"}
            value={this.state.mainSpots.toString()}
            maxLength={30}
            onChangeText={(text) => {
              if (text == "") this.setState({ mainSpots: "" });
              else this.setState({ mainSpots: Number(text) });
            }}
            onEndEditing={this.updatePrice}
          />
        </View>
        <View style={styles.secondaryView}>
          <Text style={styles.textStyle}>Main Price:</Text>
          <Text style={styles.changingText}>{this.state.mainPrice}</Text>
        </View>
        <Button style={styles.waffleButton} onPress={this.waffleUpload}>
          <Text style={styles.waffleText}>Waffle</Text>
        </Button>
      </KeyboardAwareScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Spinner color="grey" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    post: state.post.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(newPost(post)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellScreen);

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    backgroundColor: "white",
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
  tertiaryInput: {
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    fontSize: 18,
    width: 100,
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
  },
});
