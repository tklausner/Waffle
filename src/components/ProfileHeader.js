import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
} from "native-base";
import { StyleSheet } from "react-native";
import globalStyles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

export function ProfileHeader() {
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
        <Button transparent>
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
