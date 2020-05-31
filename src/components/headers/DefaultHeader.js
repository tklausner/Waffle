import React from "react";
import { Header, Body, Title } from "native-base";
import { StyleSheet } from "react-native";
import globalStyles from "../../styles";

export function DefaultHeader() {
  return (
    <Header>
      <Body>
        <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
      </Body>
    </Header>
  );
}

module.export = DefaultHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});
