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
  TouchableOpacity,
} from "react-native";
import { updateUser, getUser } from "../../api/user";

import { connect } from "react-redux";
import { NavigationContext } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const dim_width = Dimensions.get("window").width;
const dim_height = Dimensions.get("window").height;

class SettingsScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      store_description: "",
      username: "",
      first_name: "",
      last_name: "",
      show_editProfile: false,
      show_otherSetting: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clearInput() {
    if (this._isMounted) {
      this.setState({
        store_description: "",
        username: "",
        first_name: "",
        last_name: "",
        show_editProfile: false,
        show_otherSetting: false,
      });
    }
  }

  async loadUser() {
    await this.props.getUser(this.props.user.user_id);
  }

  async _submitProfile() {
    if (this.props.updateUser && this._isMounted) {
      await this.props.updateUser({
        _id: this.props.user._id,
        store_description:
          this.state.store_description.length > 0
            ? this.state.store_description
            : this.props.user.store_description,
        username:
          this.state.username.length > 0
            ? this.state.username
            : this.props.user.username,
        first_name:
          this.state.first_name.length > 0
            ? this.state.first_name
            : this.props.user.first_name,
        last_name:
          this.state.last_name.length > 0
            ? this.state.last_name
            : this.props.user.last_name,
      });
      this.clearInput();
    }
  }
  editProfile() {
    return (
      <View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder={this.props.user.store_description}
            autoCorrect={true}
            keyboardAppearance={"dark"}
            placeholderTextColor={"#999"}
            multiline={true}
            textAlignVertical={"top"}
            value={this.state.store_description}
            onChangeText={(text) => {
              this.setState({ store_description: text });
            }}
          />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.usernameInput}
            placeholder={this.props.user.username}
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
              placeholder={this.props.user.first_name}
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
              placeholder={this.props.user.last_name}
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
        <Button
          transparent
          style={styles.submitButton}
          onPress={this._submitProfile.bind(this)}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Button>
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

          {/**this.state.show_otherSetting ? this.editProfile() : null*/}
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
          <View style={styles.rightBar}></View>
        </TouchableOpacity>
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
  submitButton: {
    marginTop: "2%",
    marginLeft: "25%",
    width: "50%",
    justifyContent: "center",
    borderWidth: 2,
    color: "#00B8FA",
  },
  submitText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
