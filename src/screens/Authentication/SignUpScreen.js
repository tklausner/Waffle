import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  Header,
  Container,
  Footer,
  Left,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import stylesPage from "../../styles";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { newUser } from "../../api/user";
import pushnot from "../../notifications/pushNotifications"

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  }

  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (res) => {
          const newUser = {
            fb_id: res.user.uid,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
          };
          this.props.newUser(newUser);
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
    pushnot.registerForPushNotificationsAsync()
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container style={{ backgroundColor: "white" }}>
          <Header
            style={{ backgroundColor: "transparent", borderBottomWidth: 0 }}
          >
            <Left>
              <Button
                transparent
                style={styles.backButton}
                onPress={() => this.props.navigation.goBack()}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  style={[{ fontSize: 40 }, stylesPage.wGray]}
                />
                <Text
                  style={[
                    { fontSize: 18, marginLeft: -10, marginTop: 2.5 },
                    stylesPage.wGray,
                  ]}
                >
                  Back
                </Text>
              </Button>
            </Left>
          </Header>
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Register!</Text>
            <Text style={styles.accountInfoText}>PICK A USERNAME</Text>
            <TextInput
              style={styles.form}
              placeholder="Username"
              autoCorrect={false}
              keyboardAppearance={"dark"}
              keyboardType={"email-address"}
              placeholderTextColor={"white"}
              value={this.state.username}
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
            <Text style={styles.accountInfoText}>ACCOUNT INFORMATION</Text>
            <TextInput
              style={styles.form}
              placeholder="E-Mail"
              autoCorrect={false}
              keyboardAppearance={"dark"}
              keyboardType={"email-address"}
              placeholderTextColor={"white"}
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <TextInput
              style={styles.form}
              placeholder="Password"
              secureTextEntry={true}
              keyboardAppearance={"dark"}
              placeholderTextColor={"white"}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <Button style={styles.loginButton} onPress={this.signUp}>
              <Text style={styles.buttonText}>Create an account</Text>
            </Button>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newUser: (user) => dispatch(newUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  loginButton: {
    width: "90%",
    height: 45,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 3,
    borderRadius: 4,
    backgroundColor: "#00B8FA",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  welcomeText: {
    color: "#00B8FA",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    width: "80%",
  },
  container: {
    marginTop: 5,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    borderWidth: 0,
    width: "90%",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#999999",
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
  },
  forgotPasswordText: {
    fontSize: 12,
  },
  accountInfoText: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    color: "#00B8FA",
    marginTop: 16,
  },
});
