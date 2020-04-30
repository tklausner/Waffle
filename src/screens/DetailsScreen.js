import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "native-base";
import styles from "../styles";

const DetailsScreen = () => (
  <Container style={styles.loadingScreen}>
    <ActivityIndicator />
  </Container>
);
export default DetailsScreen;
