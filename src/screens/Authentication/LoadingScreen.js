import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Container } from "native-base";
import styles from "../../styles";

const LoadingScreen = () => (
  <Container style={styles.loadingScreen}>
    <ActivityIndicator />
  </Container>
);
export default LoadingScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
