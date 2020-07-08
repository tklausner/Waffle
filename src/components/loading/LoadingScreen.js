import React from "react";
import { ActivityIndicator, StyleSheet, Image } from "react-native";
import { Container } from "native-base";

export function LoadingScreen() {
  return (
    <Container style={styles.loadingScreen}>
      <Image
        style={{ width: 150, resizeMode: "contain" }}
        source={require("../../../assets/images/icon-256.png")}
      />
      <ActivityIndicator />
    </Container>
  );
}
module.export = LoadingScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
