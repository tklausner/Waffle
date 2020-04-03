import React, { Component } from 'react';
import {Image, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import styles from './styles';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class FPHeader extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='person' style = {styles.profileButton}/>
            </Button>
          </Left>
          <Body>
            <Title style = {styles.header}>
              Waffle
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <MaterialCommunityIcons name='message-text-outline' style = {styles.messageButton}/>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
module.export = FPHeader;
