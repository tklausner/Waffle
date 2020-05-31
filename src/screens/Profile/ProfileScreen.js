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
  Image,
} from "native-base";
import { StyleSheet } from "react-native";

export default class ProfileScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card transparent style={styles.profTop}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={require("../../../assets/images/kyle.jpg")}
                  style={{ height: 100, width: 100, borderRadius: 100 }}
                />
                <Body>
                  <Text style={styles.profName}>Kyle Harris</Text>
                  <Text style={styles.profUsername}>@Kylesabeast</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 15, paddingLeft: "5%" }}>
                  Follow my shop if you're like Ethan and like penis up your
                  butt
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
                <Button transparent>
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
        </Content>
      </Container>
    );
  }
}
module.export = ProfileScreen;

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
});
