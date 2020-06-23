import React, { Component } from "react";
import { Header, Left, Body, Right, Title, Button } from "native-base";
import { StyleSheet } from "react-native";
import globalStyles from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../api/user";

import { useNavigation, DrawerActions } from "@react-navigation/native";

export function ProfileHeader() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  function _logout() {
    dispatch(logout());
  }

  async function logOut() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Header>
      <Left>
        <Button transparent>
          <MaterialIcons
            name="notifications-none"
            style={[styles.header, globalStyles.wYellow]}
          />
        </Button>
      </Left>
      <Body>
        <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <MaterialIcons
            name="menu"
            style={[styles.header, globalStyles.wGray]}
          />
        </Button>
      </Right>
    </Header>
  );
}
module.export = ProfileHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});
