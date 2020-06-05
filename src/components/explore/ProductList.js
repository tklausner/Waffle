import React, { Component } from "react";
import { Product } from "./Product";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet, Dimensions } from "react-native";

const renderItem = ({ item, index }) => {
  return <Product product={item} key={item.id} />;
};

export function ProductList({ products, category }) {
  return (
    <Card style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => null}
        horizontal={true}
      />
    </Card>
  );
}

module.export = ProductList;

const styles = StyleSheet.create({
  header: {
    textAlign: "left",
    padding: "0%",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 0,
  },
});
