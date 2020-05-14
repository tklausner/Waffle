import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Thumbnail, Text, Left, Body } from "native-base";
import globalStyles from "../styles";

export function Message({ message }) {
  return (
    <TouchableOpacity>
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

module.export = Message;

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
