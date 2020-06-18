import React, { Component } from "react";
import { Text, ListItem } from "native-base";
import { StyleSheet, View } from "react-native";

export function PostComments({ comments }) {
  return (
    <View style={{}}>
      {comments[0] ? (
        <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
          <Text style={[styles.comments, { color: "gray" }]}>
            {comments[0].username}
          </Text>
          <Text style={[styles.comments]}>{comments[0].content}</Text>
        </ListItem>
      ) : null}
      {comments[1] ? (
        <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
          <Text style={[styles.comments, { color: "gray" }]}>
            {comments[1].username}
          </Text>
          <Text style={[styles.comments]}>{comments[1].content}</Text>
        </ListItem>
      ) : null}
      {comments[2] ? (
        <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
          <Text style={[styles.comments, { color: "gray" }]}>
            {comments[2].username}
          </Text>
          <Text style={[styles.comments]}>{comments[2].content}</Text>
        </ListItem>
      ) : null}
    </View>
  );
}

module.export = PostComments;

const styles = StyleSheet.create({
  comments: {
    marginLeft: "0%",
    paddingBottom: "1%",
    paddingTop: "1%",
    paddingRight: "5%",
    fontSize: 15,
  },
});
