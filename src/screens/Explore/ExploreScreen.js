import React, { Component } from "react";
import { Container, Content, Body, Text, Button } from "native-base";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const windowWidth = Dimensions.get("window").width;
const bigWidth = (windowWidth * 2) / 3;
const littleWidth = windowWidth / 3;

const defaultImage = require("../../../assets/images/bing.png");

export default class ExploreScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Grid>
            <Row>
              <Col style={{ width: "33.3333%" }}>
                <Row style={styles.item}>
                  <TouchableOpacity>
                    <Image style={styles.littleImage} source={defaultImage} />
                  </TouchableOpacity>
                </Row>
                <Row style={styles.item}>
                  <TouchableOpacity>
                    <Image style={styles.littleImage} source={defaultImage} />
                  </TouchableOpacity>
                </Row>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.bigImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.bigImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={{ width: "33.3333%" }}>
                <Row style={styles.item}>
                  <TouchableOpacity>
                    <Image style={styles.littleImage} source={defaultImage} />
                  </TouchableOpacity>
                </Row>
                <Row style={styles.item}>
                  <TouchableOpacity>
                    <Image style={styles.littleImage} source={defaultImage} />
                  </TouchableOpacity>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
              <Col style={styles.item}>
                <TouchableOpacity>
                  <Image style={styles.littleImage} source={defaultImage} />
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
module.export = ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },

  item: {
    backgroundColor: "#ddd",
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
    flex: 1,
  },

  bigImage: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: bigWidth,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },

  littleImage: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: littleWidth,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
});
