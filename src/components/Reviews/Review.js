import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";
import { connect } from "react-redux";
import { getTempUser } from "../../api/user";
import CachedImage from "../images/CachedImage";

class Review extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      username: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  async getUser() {
    const { user_id } = this.props.review;
    if (user_id) {
      await this.props.getTempUser(user_id);
      if (this._isMounted && this.props.temp_user) {
        this.setState({
          profile: this.props.temp_user.profile,
          username: this.props.temp_user.username,
        });
      }
    }
  }
  render() {
    return this.state.profile ? (
      <Card>
        <CardItem header>
          <Left>
            <CachedImage image={this.state.profile} style={styles.profile} />
            <Body>
              <Text style={{ fontSize: 20 }}>@{this.state.username}</Text>
            </Body>
          </Left>
          <Text>{this.props.review.rating}</Text>
          <MaterialIcons name="star" style={{ fontSize: 20 }} />
        </CardItem>
        <CardItem>
          <Body>
            <Text style={({ fontSize: 15 }, { paddingLeft: 15 })}>
              {this.props.review.content}
            </Text>
          </Body>
        </CardItem>
      </Card>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTempUser: (id) => dispatch(getTempUser(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    temp_user: state.user.temp_user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);

const styles = StyleSheet.create({
  profile: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
