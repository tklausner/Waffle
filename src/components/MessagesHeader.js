import React from "react";
import { Header, Body, Title, Left, Button, Right } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles";

export function MessagesHeader() {
  const navigation = useNavigation();

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            style={[{ fontSize: 40 }, styles.wGray]}
          />
        </Button>
      </Left>
      <Body>
        <Title style={[styles.header, styles.wBlue]}>Waffle</Title>
      </Body>
      <Right></Right>
    </Header>
  );
}

module.export = MessagesHeader;
