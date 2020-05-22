import React, { Component } from "react";
import { Text, Button, View, Header, Container, Footer, Left, Form, Item, Input, Label} from "native-base";
import {StyleSheet, TextInput} from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import stylesPage from "../styles";

export default class LoginScreen extends Component {
  render() {
    return (
    <Container style = {{backgroundColor: "white"}}>
    <Header style = {{backgroundColor: "transparent", borderBottomWidth: 0}}>
      <Left>
        <Button transparent style = {styles.backButton}>
          <MaterialIcons
            name="keyboard-arrow-left"
            style={[{ fontSize: 40}, stylesPage.wGray]}
          />
          <Text style = {[{fontSize:18, marginLeft: -10, marginTop: 2.5}, stylesPage.wGray]}>Back</Text>
        </Button>
      </Left>
    </Header>
    <View style = {styles.container}>
      <Text style = {styles.welcomeText}>
        Welcome back!
      </Text>
      <Text style = {styles.smallText}>
        Login with your email to start Waffling
      </Text>
      <Text style = {styles.accountInfoText}>
        ACCOUNT INFORMATION
      </Text>
      <TextInput style = {styles.form} placeholder = "Username or E-Mail" keyboardAppearance={"dark"} keyboardType={'email-address'} placeholderTextColor = {"white"}/>
      <TextInput style = {styles.form} placeholder = "Password" secureTextEntry={true} keyboardAppearance={"dark"} placeholderTextColor = {"white"}/>
      <Button transparent style = {styles.forgotPasswordButton}>
        <Text style = {styles.forgotPasswordText}>
          Forgot your password?
        </Text>
      </Button>
      <Button style = {styles.loginButton}>
        <Text style = {styles.buttonText}>
          Login
        </Text>
      </Button>
    </View>
    </Container>
    );
  }
}
module.export = LoginScreen;

const styles= StyleSheet.create({
    loginButton:{
      width: "90%",
      height: 45,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      borderRadius: 4,
      backgroundColor: "#00B8FA",
    },
    buttonText:{
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 14
    },
    smallText:{
      color: "#00B8FA",
      textAlign: "center",
      fontSize: 14,
      marginBottom: 35,
      width: "80%"
    },
    welcomeText:{
      color: "#00B8FA",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10,
      width: "80%"
    },
    container:{
      marginTop: 5,
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    backButton:{
      justifyContent: "center",
      alignItems: "center",
    },
    form:{
      borderWidth: 0,
      width: '90%',
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
      marginBottom: 10,
      backgroundColor: "#999999",
      color: "white",
      fontSize: 16,
      paddingLeft: 10
    },
    forgotPasswordButton:{
      height: 35,
      alignSelf: 'flex-start',
      marginLeft: 2.5,
      marginTop: -10
    },
    forgotPasswordText:{
      fontSize: 12
    },
    accountInfoText:{
      alignSelf: 'flex-start',
      marginLeft: "5%",
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 8,
      color: "#00B8FA"
    }
})
