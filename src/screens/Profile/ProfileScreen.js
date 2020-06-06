import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from "native-base";
import { StyleSheet, Image } from "react-native";

import { connect } from "react-redux";

import AsyncImage from "../../components/images/AsyncImage";

class ProfileScreen extends Component {
  state = {
    profile: "test/F6A43F1B-CF32-4ED3-A8A8-30E6B4B9F28A",
    username: "@Kylesabeast",
    profileName: "Kyle Harris",
    description: "Welcome to the Shop!",
  };
  render() {
    return (
      <Container>
        <Content>
          <Card transparent style={styles.profTop}>
            <CardItem>
              <Left>
                <AsyncImage
                  image={this.state.profile}
                  style={styles.profImage}
                />
                <Body>
                  <Text style={styles.profName}>{this.state.profileName}</Text>
                  <Text style={styles.profUsername}>{this.state.username}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 15, paddingLeft: "5%" }}>
                  {this.state.description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: "10%",
                      color: "#000000",
                    }}
                  >
                    Waffles
                  </Text>
                </Button>
              </Left>
              <Body>
                <Button
                  transparent
                  onPress={() => {
                    console.log(this.state.url);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: "15%",
                      color: "#000000",
                    }}
                  >
                    Market
                  </Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingRight: "30%",
                      color: "#000000",
                    }}
                  >
                    Saved
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card></Card>
        </Content>
      </Container>
    );
  }
}
export default connect(null, null)(ProfileScreen);

const styles = StyleSheet.create({
  profName: {
    fontSize: 25,
    paddingLeft: "5%",
  },
  profUsername: {
    fontSize: 15,
    paddingLeft: "5%",
    color: "#999999",
  },
  profTop: {
    paddingTop: "5%",
    paddingLeft: "10%",
  },
  profImage: {
    height: 75,
    width: 75,
    borderRadius: 200 / 2,
    marginLeft: "-10%",
  },
});
