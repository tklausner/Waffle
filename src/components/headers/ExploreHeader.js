import React from "react";
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Left,
  Body,
  Right,
  Button,
  Text,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";

export function ExploreHeader() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Header searchBar rounded>
        <Item
          regular
          style={{
            borderRadius: 50,
            marginLeft: 10,
            marginBottom: 5,
            height: 35,
          }}
        >
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent style={{ marginBottom: 5 }}>
          <Text>Cancel</Text>
        </Button>
      </Header>
    </TouchableWithoutFeedback>
  );
}
module.export = ExploreHeader;
