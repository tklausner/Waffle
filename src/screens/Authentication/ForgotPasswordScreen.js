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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import stylesPage from "../../styles";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
    this.props.navigation.goBack();
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
            <Text style={styles.welcomeText}>Forgot your password?</Text>
            <Text style={styles.smallText}>
              Enter your e-mail below so we can send you a link to reset your
              password
            </Text>
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
            <Button style={styles.loginButton} onPress={this.forgotPassword}>
              <Text style={styles.buttonText}>Reset password</Text>
            </Button>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
module.export = LoginScreen;

const styles = StyleSheet.create({
  loginButton: {
    width: "90%",
    height: 45,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: "#00B8FA",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  smallText: {
    color: "#00B8FA",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 35,
    width: "80%",
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
    marginBottom: 20,
    backgroundColor: "#999999",
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
  },
});
