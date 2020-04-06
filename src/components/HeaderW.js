import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title
} from "native-base";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

export class HeaderW extends Component {
  render() {
    return (
      <Header>
        <Left></Left>
        <Body>
          <Title style={[styles.header, styles.wBlue]}>Waffle</Title>
        </Body>
        <Right>
          <Button transparent>
            <MaterialIcons
              name="mail"
              style={[styles.header, styles.wYellow]}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}
module.export = HeaderW;
