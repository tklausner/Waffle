import React, { Component } from "react";
import { Container, Content, Body, Text, Button} from "native-base";
import { Image, TouchableOpacity, StyleSheet} from "react-native"
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class ExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Grid>
          <Row>
            <Col style = {{width: "33.3333%"}}>
              <Row style={{ backgroundColor: '#635DB7', aspectRatio: 1 }}>
              <Button style = {{aspectRatio: 1, width: "100%"}}><Text>teddy</Text></Button>
              </Row>
              <Row style={{ aspectRatio: 1, backgroundColor: '#935DB7'}}>
              </Row>
            </Col>
            <Col style={styles.item}>
            <TouchableOpacity>
              <Image style = {styles.image} source={require("../../assets/images/ethan.jpeg")}/>
            </TouchableOpacity>
            </Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#135DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#235DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#335DB7', aspectRatio: 1 }}></Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#535DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#735DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#835DB7', aspectRatio: 1 }}></Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#435DB7'}}></Col>
            <Col style = {{width: "33.3333%"}}>
              <Row style={{ backgroundColor: '#635DB7', aspectRatio: 1 }}></Row>
              <Row style={{ backgroundColor: '#935DB7', aspectRatio: 1 }}></Row>
            </Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#135DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#235DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#335DB7', aspectRatio: 1 }}></Col>
          </Row>
          <Row>
            <Col style={{ backgroundColor: '#535DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#735DB7', aspectRatio: 1 }}></Col>
            <Col style={{ backgroundColor: '#835DB7', aspectRatio: 1 }}></Col>
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
    backgroundColor: 'blue'
  },

  item: {
      flex:1,
       backgroundColor:"#ddd",
       alignItems:'center',
       aspectRatio:1,
       flexDirection: 'row'
  },

  image: {
      alignItems:'center',
       justifyContent:'center',
       flex:1,
       resizeMode: 'cover'
  }
})
