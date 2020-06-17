import React from "react";
import { Product } from "./Product";
import { Text, Card } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item, index }) => {
  return <Product product={item} key={item._id} />;
};

export function ProductList({ products, category }) {
  return products ? (
    <Card style={styles.container}>
      <Text style={styles.header}>#{category}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => null}
        horizontal={true}
      />
    </Card>
  ) : null;
}

module.export = ProductList;

const styles = StyleSheet.create({
  header: {
    textAlign: "left",
    padding: "2%",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 0,
    color: "#00B8FA",
  },
});
