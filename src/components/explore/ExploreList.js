import React from "react";
import { ProductList } from "./ProductList";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet, Dimensions } from "react-native";

const renderItem = ({ item, index }) => {
  return <ProductList products={item} key={item.id} style={styles.item} />;
};

export function ExploreList({ products }) {
  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>There are no categories?</Text>}
    />
  );
}

module.export = ExploreList;

const styles = StyleSheet.create({});
