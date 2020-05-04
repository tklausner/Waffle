import React from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

export function HomeHeader() {
  const navigation = useNavigation();
  return (
    <Header>
      <Left></Left>
      <Body>
        <Title style={[styles.header, styles.wBlue]}>Waffle</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate("Messages")}>
          <MaterialIcons name="mail" style={[styles.header, styles.wYellow]} />
        </Button>
      </Right>
    </Header>
  );
}
module.export = HomeHeader;
