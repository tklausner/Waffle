import React from "react";
import { Review } from "./Review";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item }) => <Review review={item} key={item.id} />;

export function ReviewList({ reviews }) {
  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>Teddy's a Bitch</Text>}
    />
  );
}

module.export = ReviewList;
