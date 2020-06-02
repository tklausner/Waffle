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
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import styles from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import WaffleIcon from "../../../assets/images/OnlineLogo.png";

export function ExploreHeader() {
  const navigation = useNavigation();
  return (
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
      </Item>
      <Image
        source={WaffleIcon}
        style={{
          height: "80%",
          width: "10%",
          flex: 0,
          marginLeft: "2%",
        }}
      />
    </Header>
  );
}
module.export = ExploreHeader;
