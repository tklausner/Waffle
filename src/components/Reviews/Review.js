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

export function Review({ review }) {
  const navigation = useNavigation();
  return (
    <Card>
      <CardItem header>
        <Left>
          <Thumbnail source={review.profpic} />
            <Body>
              <Text style={{fontSize:20}}>
              {review.username}</Text>
            </Body>
        </Left>
          <Text>
            {review.stars}
          </Text>
        <MaterialIcons name="star" style={{fontSize:20}} />
      </CardItem>
      <CardItem>
        <Body>
          <Text style={{fontSize:15}, {paddingLeft:15}}>
            {review.Content}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
}

module.export = Review;

const styles = StyleSheet.create({

});
