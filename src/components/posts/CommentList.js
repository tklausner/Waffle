import React, { Component } from "react";
import { Container, Text, ListItem } from "native-base";
import { FlatList, StyleSheet, View } from "react-native";

import { connect } from "react-redux";

import { LoadingScreen } from "../loading/LoadingScreen";
import globalStyles from "../../styles";

const _renderItem = ({ item, index }) => {
  return (
    <ListItem style={styles.container}>
      <Text style={[styles.comment, { color: "gray" }]}>@{item.username}</Text>
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
  container: {
    marginTop: "5%",
    flexDirection: "row",
    borderBottomWidth: 0,
    marginBottom: "-5%",
  },
  comment: {
    marginLeft: "2%",
    fontSize: 18,
  },
  commentContainer: {
    marginTop: "3%",
    marginLeft: "5%",
    borderRadius: 90,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    padding: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
