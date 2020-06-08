import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncImage from "../images/AsyncImage";

const dim = Dimensions.get("window").width / 2.5;

export function PostPreview({ post }) {
  const navigation = useNavigation();
  return post ? (
    <TouchableOpacity>
      <View style={styles.view}>
        <AsyncImage image={post.image} style={styles.image} />
      </View>
    </TouchableOpacity>
  ) : null;
}

module.export = PostPreview;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingRight: 20,
    paddingBottom: 15,
  },
  image: {
    width: dim,
    height: dim,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
  },
});
