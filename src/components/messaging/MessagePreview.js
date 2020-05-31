import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../styles";

export function MessagePreview({ message }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          id: message.id,
          content: message.content,
        })
      }
    >
      <Card style={styles.content}>
        <CardItem>
          <Left style={styles.profile}>
            <Thumbnail source={message.profile} />
          </Left>
          <Body style={styles.body}>
            <Text style={{ fontWeight: "bold" }}>{message.username}</Text>
            <Text>{message.content}</Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

module.export = MessagePreview;

const styles = StyleSheet.create({
  body: {
    marginLeft: "-60%",
    marginTop: "2%",
  },
  content: {
    marginTop: "0%",
    marginBottom: "0%",
  },
});
