import React from "react";
import { Product } from "./Product";
import { Content, Container, Text, View, Header, Card } from "native-base";
import { FlatList, StyleSheet, Dimensions } from "react-native";

const renderItem = ({ item, index }) => {
  return <Product product={item} key={item.id} />;
};

export function ProductList({ products }) {
  return (
    <Card style={styles.container}>
      <Text style={styles.header}>{products.category}</Text>
      <FlatList
        data={products.product}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text>There are no products in this category</Text>
        )}
        horizontal={true}
      />
    </Card>
  );
}

module.export = ProductList;

const styles = StyleSheet.create({
  header: {
    textAlign: "left",
    padding: "2%",
    fontWeight: "bold",
    fontSize: 20,
  },
});
