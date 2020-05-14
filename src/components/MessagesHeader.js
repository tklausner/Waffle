import React from "react";
import { Header, Body, Title, Left, Button, Right } from "native-base";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import globalStyles from "../styles";

export function MessagesHeader() {
  const navigation = useNavigation();

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            style={[{ fontSize: 40 }, globalStyles.wGray]}
          />
        </Button>
      </Left>
      <Body>
        <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
      </Body>
      <Right></Right>
    </Header>
  );
}

module.export = MessagesHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});
