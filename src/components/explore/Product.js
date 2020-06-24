import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CachedImage from "../images/CachedImage";

const dim = Dimensions.get("window").width / 4;

export function Product({ product }) {
  const navigation = useNavigation();
  return product ? (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Explore_Product", { post: product });
      }}
    >
      <View style={styles.view}>
        <CachedImage image={product.image} style={styles.image} />
      </View>
    </TouchableOpacity>
  ) : null;
}

module.export = Product;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  image: {
    width: dim,
    height: dim,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
  },
});
