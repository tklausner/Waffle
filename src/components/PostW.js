import React, { Component, useState } from "react";
import { Image, StyleSheet } from "react-native";
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
  ListItem,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../styles";

export class PostW extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={this.props.profile} />
                <Body>
                  <Text>{this.props.username}</Text>
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
                <Image source={this.props.image} style={styles.image} />
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
                  10
                </Text>
                <Text style={styles.bar}>
                  <MaterialIcons name="monetization-on" style={styles.bar} />
                  30
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Text>{this.props.description}</Text>
            </CardItem>
            <CardItem button style={styles.waffleButton}>
              <Text style={styles.waffleButton}>WaffleButton</Text>
            </CardItem>
            <CardItem>
              <List>
                <ListItem style={styles.comments}>
                  <Text style={[styles.comments, { color: "gray" }]}>
                    User1
                  </Text>
                  <Text style={[styles.comments]}>Comment Comment</Text>
                </ListItem>
                <ListItem style={styles.comments}>
                  <Text style={[styles.comments, { color: "gray" }]}>
                    User2
                  </Text>
                  <Text style={[styles.comments]}>Comment Comment</Text>
                </ListItem>
              </List>
            </CardItem>
            <CardItem button style={styles.viewMore}>
              <Text style={styles.viewMore}>View more comments</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
module.export = PostW;

const styles = StyleSheet.create({
  content: {
    padding: "0%",
    marginTop: "0%",
    marginBottom: "-10%",
    flex: 0,
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
