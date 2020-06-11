import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Header,
  Body,
  Title,
  Container,
  Right,
  Left,
  Text,
  Button,
} from "native-base";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import globalStyles from "../../styles";

export function SellImageHeader() {
  const [keyboardOpen, setKeyboardOpen] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  function _keyboardDidShow() {
    setKeyboardOpen("OK");
  }

  function _keyboardDidHide() {
    setKeyboardOpen("");
  }

  function buttonClick() {
      Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Header>
          <Left></Left>
          <Body>
            <Title style={[styles.header, globalStyles.wBlue]}>Waffle</Title>
          </Body>
          <Right>
            <Button transparent onPress={buttonClick}>
              <Text style={[styles.text, globalStyles.wBlue]}>
                {keyboardOpen}
              </Text>
            </Button>
          </Right>
        </Header>
      </View>
    </TouchableWithoutFeedback>
  );
}

module.export = SellImageHeader;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
