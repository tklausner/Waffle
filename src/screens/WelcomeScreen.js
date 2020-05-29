import React, { Component } from "react";
import { Text, Button, View, Header, Container, Footer} from "native-base";
import {StyleSheet, Image} from "react-native"
import { useNavigation } from "@react-navigation/native";

export default class WelcomeScreen extends Component {
  render() {
    return (
    <Container style = {{backgroundColor: "white"}}>
      <Header style = {{backgroundColor: "transparent", borderBottomWidth: 0}}></Header>
      <View style = {styles.container}>
        <Image style = {styles.logo} source={require("../../assets/images/OnlineLogo.png")}/>
        <Text style = {styles.welcomeText}>
          Welcome to Waffle
        </Text>
        <Text style = {styles.smallText}>
          Join over 200 million people who use Waffle to buy goods.
        </Text>
        <Button style = {styles.registerButton} onPress={() => this.props.navigation.navigate("SignUpScreen")}>
          <Text style = {styles.buttonText}>
            Register
          </Text>
        </Button>
        <Button style = {styles.loginButton} onPress={() => this.props.navigation.navigate("LoginScreen")}>
          <Text style = {styles.buttonText}>
            Login
          </Text>
        </Button>
      </View>
    </Container>
    );
  }
}
module.export = WelcomeScreen;

const styles= StyleSheet.create({
    loginButton:{
      width: "90%",
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      borderRadius: 4,
      backgroundColor: "#999999",
    },
    registerButton:{
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
      marginBottom: 16,
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
      marginTop: 50,
      marginBottom: 40,
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    logo:{
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      width: "60%",
      resizeMode: "contain",
      marginBottom: 20
    }
})
