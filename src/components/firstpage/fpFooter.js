import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import styles from './styles';

export default class FPFooter extends Component {
  render() {
    return (
      <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
              <MaterialCommunityIcons name="home-outline" style = {styles.footerButtons}/>
            </Button>
            <Button vertical>
              <Icon name="search" style = {styles.footerButtons}/>
            </Button>
            <Button vertical active>
              <MaterialCommunityIcons name="image-filter-center-focus-weak" style = {styles.footerButtons}/>
            </Button>
            <Button vertical>
              <MaterialCommunityIcons name="emoticon-poop" style = {styles.footerButtons}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
module.export = FPFooter;
