import React, { useEffect, useState } from "react";
import { Header, Body, Title, Container, Right, Left, Text } from "native-base";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import globalStyles from "../../styles";

export function SellImageHeader() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  return (
    <Header>
      <Left></Left>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Body>
          <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
        </Body>
      </TouchableWithoutFeedback>
      <Right>
        <Text>blah</Text>
      </Right>
    </Header>
  );
}

module.export = SellImageHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
});
