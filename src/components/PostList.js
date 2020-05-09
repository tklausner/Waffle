import React from "react";
import Post from "./Post";
import { Content } from "native-base";
import { FlatList, ListItem } from "react-native";

const renderItem = ({ item: post }) => <Post post={post} key={post.id} />;

export function PostList({ posts }) {
  console.log("POSTLIST");
  return (
    <FlatList
      style={{ flex: 1, borderColor: "red", borderWidth: 2 }}
      data={posts}
      renderItem={this.renderItem}
      keyExtractor={(post) => post.id}
    />
  );
}

module.export = PostList;
