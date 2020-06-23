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

import CachedImage from "../images/CachedImage";
import { LoadingScreen } from "../loading/LoadingScreen";

export function Waffle({ profile, post }) {
  const navigation = useNavigation();
  return profile ? (
    <Content style={styles.content}>
      <Card>
        <CardItem>
          <Left>
            <CachedImage image={profile} style={styles.profile} />
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
          <View style={styles.waffleStyle}>
            <Image
              source={require("../../../assets/images/WaffleIcon.png")}
              style={styles.image}
            />
          </View>
        </CardItem>
      </Card>
    </Content>
  ) : null;
}

module.export = Waffle;

const styles = StyleSheet.create({
  content: {
    marginTop: "-2%",
    marginBottom: "0%",
    flex: 0,
    borderTopWidth: 0,
  },
  image: {
    height: 345,
    width: "110%",
    flex: 1,
    marginLeft: "-5%",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 90,
  },
  waffleStyle: {
    borderRadius: 90,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
  },
});
