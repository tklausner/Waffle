import React, { Component } from "react";
import { Container, Content, Button } from "native-base";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

const dim_width = Dimensions.get("window").width;
const dim_height = Dimensions.get("window").height;

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      username: "",
      first_name: "",
      last_name: "",
      show_editProfile: false,
      show_otherSetting: false,
    };
  }
  editProfile() {
    return (
      <View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Change your description..."
            autoCorrect={true}
            keyboardAppearance={"dark"}
            placeholderTextColor={"#999"}
            multiline={true}
            textAlignVertical={"top"}
            value={this.state.description}
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.usernameInput}
            placeholder="Change your username..."
            autoCorrect={true}
            keyboardAppearance={"dark"}
            placeholderTextColor={"#999"}
            multiline={true}
            textAlignVertical={"top"}
            value={this.state.username}
            onChangeText={(text) => {
              this.setState({ username: text });
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.nameContainer, { marginLeft: "5%" }]}>
            <Text style={styles.label}>first name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Michael"
              autoCorrect={true}
              keyboardAppearance={"dark"}
              placeholderTextColor={"#999"}
              multiline={true}
              textAlignVertical={"top"}
              value={this.state.first_name}
              onChangeText={(text) => {
                this.setState({ first_name: text });
              }}
            />
          </View>
          <View style={[styles.nameContainer, { marginLeft: "2%" }]}>
            <Text style={styles.label}>last name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Smith"
              autoCorrect={true}
              keyboardAppearance={"dark"}
              placeholderTextColor={"#999"}
              multiline={true}
              textAlignVertical={"top"}
              value={this.state.last_name}
              onChangeText={(text) => {
                this.setState({ last_name: text });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container}>
          <Button
            transparent
            style={{ marginLeft: "5%" }}
            onPress={() => {
              this.setState({
                show_editProfile: !this.state.show_editProfile,
              });
            }}
          >
            <Text style={styles.header}>Edit Profile</Text>
          </Button>
          {this.state.show_editProfile ? this.editProfile() : null}
          <Button
            transparent
            style={{ marginLeft: "5%" }}
            onPress={() => {
              this.setState({
                show_otherSetting: !this.state.show_otherSetting,
              });
            }}
          >
            <Text style={styles.header}>Other Settings</Text>
          </Button>
          {this.state.show_otherSetting ? this.editProfile() : null}
        </View>
        <View style={styles.rightBar}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#999",
  },
  rightBar: {
    backgroundColor: "#00B8FA",
    width: (dim_width / 8) * 3,
    height: dim_height,
  },
  container: {
    height: dim_height,
    width: "68%",
    backgroundColor: "#FFF",
  },
  label: {
    marginTop: "2%",
    marginLeft: "2%",
    fontWeight: "600",
    fontSize: 14,
    color: "#00B8FA",
  },
  descriptionContainer: {
    marginTop: "5%",
    marginLeft: "5%",
    width: "90%",
  },
  descriptionInput: {
    marginTop: "5%",
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    height: 60,
    justifyContent: "center",
    backgroundColor: "#FFF",
    color: "#000",
    fontSize: 16,
    paddingLeft: 8,
    marginBottom: 10,
  },
  usernameContainer: {
    width: "90%",
    marginLeft: "1%",
    marginLeft: "5%",
  },
  usernameInput: {
    marginTop: "5%",
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    height: 32,
    justifyContent: "center",
    backgroundColor: "#FFF",
    color: "#000",
    fontSize: 16,
    paddingLeft: 8,
    marginBottom: 10,
  },
  nameContainer: {
    width: "50%",
    marginTop: "2%",
  },
  nameInput: {
    marginTop: "5%",
    width: "75%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    height: 32,
    justifyContent: "center",
    backgroundColor: "#FFF",
    color: "#000",
    fontSize: 16,
    paddingLeft: 8,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(SettingsScreen);
