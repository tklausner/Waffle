import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Text } from "native-base";

export function EmptyScreen({ content }) {
  return (
    <View style={styles.EmptyScreen}>
      <Text style={styles.text}>{content}</Text>
      <Image
        style={{ width: 150, resizeMode: "contain" }}
        source={require("../../../assets/images/OnlineLogo.png")}
      />
    </View>
  );
}
module.export = EmptyScreen;

const styles = StyleSheet.create({
  EmptyScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 20,
  },
});
