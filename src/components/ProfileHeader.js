import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button
} from "native-base";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

export function ProfileHeader() {
  return (
    <Header>
      <Left>
        <Button transparent>
          <MaterialIcons
            name="notifications-none"
            style={[styles.header, styles.wYellow]}
          />
        </Button>
      </Left>
      <Body>
        <Title style={[styles.header, styles.wBlue]}>Waffle</Title>
      </Body>
      <Right>
        <Button transparent>
          <MaterialIcons name="menu" style={[styles.header, styles.wGray]} />
        </Button>
      </Right>
    </Header>
  );
}
module.export = ProfileHeader;
