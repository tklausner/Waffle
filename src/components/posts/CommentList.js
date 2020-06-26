import React, { Component } from "react";
import { Container, Text, ListItem } from "native-base";
import { FlatList, StyleSheet, View } from "react-native";

import { connect } from "react-redux";

import { LoadingScreen } from "../loading/LoadingScreen";

const _renderItem = ({ item }) => {
  return (
    <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
      <Text style={[styles.comments, { color: "gray" }]}>@{item.username}</Text>
      <Text style={[styles.comments]}>{item.content}</Text>
    </ListItem>
  );
};

export function CommentList({ comments }) {
  return (
    <Container>
      {comments ? (
        <FlatList
          data={comments}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => null}
          style={{ flex: 1, marginLeft: 20 }}
          windowSize={6}
          initialNumToRender={3}
        />
      ) : null}
    </Container>
  );
}

module.export = CommentList;

const styles = StyleSheet.create({
  comments: {
    marginLeft: "0%",
    paddingBottom: "1%",
    paddingTop: "1%",
    paddingRight: "5%",
    fontSize: 18,
  },
});
