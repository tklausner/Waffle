import React, { Component, useState } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
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
  ListItem
} from "native-base";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
var image = require("../../assets/images/Image.png");

export class PostW extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.post}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={image} />
                <Body>
                  <Text>{this.props.username}</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent>
                  <MaterialIcons name="more-horiz" style={styles.postTop} />
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={require("../../assets/images/Image.png")}
                  style={{
                    height: 296,
                    width: "110%",
                    flex: 1,
                    marginLeft: "-5%"
                  }}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Left style={styles.postBar}>
                <Button transparent>
                  <MaterialIcons
                    name="favorite-border"
                    style={styles.postBar}
                  />
                </Button>
                <Button transparent>
                  <MaterialIcons
                    name="bookmark-border"
                    style={styles.postBar}
                  />
                </Button>
                <Button transparent>
                  <MaterialIcons name="send" style={styles.postBar} />
                </Button>
              </Left>
              <Body></Body>
              <Right style={[styles.postBar, styles.postBarRight]}>
                <Text style={styles.postBar}>
                  <MaterialIcons name="pie-chart" style={styles.postBar} />
                  10
                </Text>
                <Text style={styles.postBar}>
                  <MaterialIcons
                    name="monetization-on"
                    style={styles.postBar}
                  />
                  30
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Text>
                Item description Item description Item description Item
                description Item description Item description Item description
              </Text>
            </CardItem>
            <CardItem button style={styles.waffleButton}>
              <Text style={styles.waffleButton}>WaffleButton</Text>
            </CardItem>
            <CardItem>
              <List>
                <ListItem style={styles.postComments}>
                  <Text style={[styles.postComments, { color: "gray" }]}>
                    User1
                  </Text>
                  <Text style={[styles.postComments]}>Comment Comment</Text>
                </ListItem>
                <ListItem style={styles.postComments}>
                  <Text style={[styles.postComments, { color: "gray" }]}>
                    User2
                  </Text>
                  <Text style={[styles.postComments]}>Comment Comment</Text>
                </ListItem>
              </List>
            </CardItem>
            <CardItem button style={styles.postViewMore}>
              <Text style={styles.postViewMore}>View more comments</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
module.export = PostW;
