import React from "react";
import { Header, Item, Icon, Input } from "native-base";
import { Image } from "react-native";
import WaffleIcon from "../../../assets/images/OnlineLogo.png";

export function ExploreHeader() {
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
