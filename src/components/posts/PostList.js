import React from "react";
import { Post } from "./Post";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item }) => <Post post={item} key={item.id} />;

export function PostList({ posts }) {
  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>Ethan's a Bitch</Text>}
    />
  );
}

module.export = PostList;
