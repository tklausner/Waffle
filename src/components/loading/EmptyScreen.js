import React from "react";
import { StyleSheet, Image } from "react-native";
import { Container, Text } from "native-base";

export function EmptyScreen({ content }) {
  return (
    <Container style={styles.EmptyScreen}>
      <Text style={styles.text}>{content}</Text>
      <Image
        style={{ width: 150, resizeMode: "contain" }}
        source={require("../../../assets/images/OnlineLogo.png")}
      />
    </Container>
  );
}
module.export = EmptyScreen;

const styles = StyleSheet.create({
  EmptyScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
