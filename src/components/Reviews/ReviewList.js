import React from "react";
import Review from "./Review";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import { EmptyScreen } from "../loading/EmptyScreen";

const renderItem = ({ item }) => <Review review={item} key={item._id} />;

export function ReviewList({ reviews }) {
  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={() => <EmptyScreen content="You have no reviews" />}
    />
  );
}

module.export = ReviewList;
