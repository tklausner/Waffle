import React from "react";
import { Header, Left, Body, Right, Button, Title } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import globalStyles from "../../styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function HomeHeader() {
  const navigation = useNavigation();
  return (
    <Header>
      <Left></Left>
      <Body>
        <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate("Messaging")}>
          <MaterialIcons
            name="mail"
            style={[styles.header, globalStyles.wYellow]}
          />
        </Button>
      </Right>
    </Header>
  );
}
module.export = HomeHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});
