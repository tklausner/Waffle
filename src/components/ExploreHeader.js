import React from "react";
import {
  Container,
  Header,
  Item,
  Icon,
  Left,
  Body,
  Right,
  Button,
  Text
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

export function ExploreHeader() {
  const navigation = useNavigation();
  return (
    <Container>
        <Header searchBar rounded>
          <Button transparent onPress={() => navigation.navigate("Search")}
          style={{ borderRadius: 50, marginLeft: 10, marginRight: 10, marginBottom: 5, height:35 }}>
            <Icon name="ios-search" />
            <Icon name="ios-people" />
          </Button>
        </Header>
      </Container>
  );
}
module.export = ExploreHeader;
