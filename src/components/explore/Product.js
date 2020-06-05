import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../styles";

const dim = Dimensions.get("window").width / 4;

export function Product({ product }) {
  const navigation = useNavigation();
  console.log("PROFILE", product.profile);
  return product ? (
    <TouchableOpacity>
      <View style={styles.view}>
        <Text>{product.username}</Text>
        <Image source={product.profile} style={styles.image} />
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
    marginLeft: "0%",
    width: dim,
    height: dim,
    borderWidth: 1,
    borderColor: "#999999",
  },
});
