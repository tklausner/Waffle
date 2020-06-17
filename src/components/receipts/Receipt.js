import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";

export function Receipt({ receipt }) {
  const navigation = useNavigation();
  return (
    <Card>
    <CardItem>
      <Left>
        <Thumbnail source={receipt.profpic} />
          <Body>
            <Text>
            {receipt.prefix}</Text>
            <Text style={{fontWeight:'bold'}}>
            {receipt.username}</Text>
          </Body>
      </Left>
      <Right>
        <Button>
          <Thumbnail large square source={receipt.itempic} />
        </Button>
      </Right>
    </CardItem>
    <CardItem>
      <Text style= {{fontWeight:'bold'}}>
        Item:
      </Text>
      <Text>
        {receipt.item}</Text>
    </CardItem>
    <CardItem>
      <Text style= {{fontWeight:'bold'}}>
        Total Sale Price:
      </Text>
      <Text>
        {receipt.totprice}</Text>
    </CardItem>
    <CardItem>
      <Text style= {{fontWeight:'bold'}}>
        Price Paid:
      </Text>
      <Text>
        {receipt.pricepaid}</Text>
    </CardItem>

    </Card>
  );
}

module.export = Receipt;

const styles = StyleSheet.create({

});
