import React, { Component } from "react";
import { Container, Content, Header } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class ExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Col style={{ backgroundColor: '#635DB7', height: 200 }}></Col>
          <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
        </Grid>
      </Container>
    );
  }
}
module.export = ExploreScreen;
