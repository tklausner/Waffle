import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";

export function Post({ post }) {
  console.log(post);
  const navigation = useNavigation();
  return (
    <Content style={styles.content}>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={post.profile} />
            <Body>
              <Text>{post.username}</Text>
            </Body>
          </Left>
          <Right>
            <Button transparent>
              <MaterialIcons
                name="more-horiz"
                style={[{ fontSize: 40 }, globalStyles.wGray]}
              />
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={post.image} style={styles.image} />
          </Body>
        </CardItem>
        <CardItem>
          <Left style={styles.bar}>
            <Button transparent>
              <MaterialIcons name="favorite-border" style={styles.bar} />
            </Button>
            <Button transparent>
              <MaterialIcons name="bookmark-border" style={styles.bar} />
            </Button>
            <Button transparent>
              <MaterialIcons name="send" style={styles.bar} />
            </Button>
          </Left>
          <Body></Body>
          <Right
            style={[
              { flexDirection: "row", justifyContent: "space-around" },
              styles.bar,
            ]}
          >
            <Text style={styles.bar}>
              <MaterialIcons name="pie-chart" style={styles.bar} />
              {post.waffles_remaining}
            </Text>
            <Text style={styles.bar}>
              <MaterialIcons name="monetization-on" style={styles.bar} />
              {post.value}
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>{post.description}</Text>
        </CardItem>
        <CardItem
          button
          style={styles.waffleButton}
          onPress={() =>
            navigation.navigate("Waffle", {
              post: post,
            })
          }
        >
          <Text style={styles.waffleButton}>WaffleButton</Text>
        </CardItem>
        <CardItem>
          <List>
            <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
              <Text style={[styles.comments, { color: "gray" }]}>User1</Text>
              <Text style={[styles.comments]}>Comment Comment</Text>
            </ListItem>
            <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
              <Text style={[styles.comments, { color: "gray" }]}>User2</Text>
              <Text style={[styles.comments]}>Comment Comment</Text>
            </ListItem>
          </List>
        </CardItem>
        <CardItem button style={styles.viewMore}>
          <Text style={styles.viewMore}>View more comments</Text>
        </CardItem>
      </Card>
    </Content>
  );
}

module.export = Post;

const styles = StyleSheet.create({
  content: {
    marginTop: "-2%",
    marginBottom: "0%",
    flex: 0,
    borderTopWidth: 0,
  },
  bar: {
    fontSize: 20,
    marginTop: "-2%",
  },
  barRight: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  comments: {
    marginLeft: "0%",
    paddingBottom: "1%",
    paddingTop: "1%",
    paddingRight: "5%",
    fontSize: 15,
  },
  viewMore: {
    fontSize: 15,
    color: "lightgray",
    justifyContent: "space-around",
    paddingTop: "1%",
  },
  waffleButton: {
    color: "red",
    justifyContent: "space-around",
  },
  image: {
    height: 345,
    width: "110%",
    flex: 1,
    marginLeft: "-5%",
  },
});
