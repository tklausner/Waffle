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

export function Waffle({ post }) {
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
          <Image
            source={require("../../assets/images/WaffleIcon.png")}
            style={styles.image}
          />
        </CardItem>
      </Card>
    </Content>
  );
}

module.export = Waffle;

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
