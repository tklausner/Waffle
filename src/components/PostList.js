import React from "react";
import Post from "./Post";
import { Content } from "native-base";
import { FlatList, ListItem } from "react-native";

export function PostList({ posts }) {
  return (
    <Content>
      <FlatList
        data={posts}
        renderItem={({ post }) => <Post post={post} key={post.id} />}
        keyExtractor={(post) => post.id}
      />
    </Content>
  );
}

module.export = PostList;
