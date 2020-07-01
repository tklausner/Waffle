import React, { Component } from "react";
import { Container, Text, ListItem, Button } from "native-base";
import { FlatList, StyleSheet, View } from "react-native";

import { LoadingScreen } from "../loading/LoadingScreen";
import globalStyles from "../../styles";

import { useDispatch } from "react-redux";
import { deleteComment } from "../../api/comment";

const _renderItem = ({ item, index }) => {
  return (
    <ListItem style={styles.container}>
      <Text style={styles.comment}>@{item.username}</Text>
      <View
        style={[
          styles.commentContainer,
          { borderColor: index % 2 == 0 ? "#00B8FA" : "#EACD2E" },
        ]}
      >
        <Text style={[styles.commentContent]}>{item.content}</Text>
      </View>
    </ListItem>
  );
};

export function CommentList({ comments }) {
  const dispatch = useDispatch();

  return (
    <Container style={{ marginTop: "5%", marginBottom: "2%" }}>
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
  container: {
    flexDirection: "row",
    borderBottomWidth: 0,
    marginBottom: "0%",
    justifyContent: 'center'
  },
  comment: {
    fontSize: 18,
    color: "#999",
  },
  commentContainer: {
    marginTop: "0%",
    marginLeft: "5%",
    borderRadius: 90,
    borderTopWidth: 0.4,
    borderBottomWidth: 2,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    padding: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  commentContent: {
    color: "#555",
  },
});
