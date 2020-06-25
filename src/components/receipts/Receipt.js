import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";

import CachedImage from "../images/CachedImage";
import { connect } from "react-redux";
import { getTempUser } from "../../api/user";
import { getPost } from "../../api/post";

class Receipt extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      username: "",
      image: "",
      description: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.getUser();
    this.getPost();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  async getUser() {
    const { user_id } = this.props.receipt;
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

  async getPost() {
    const { post_id } = this.props.receipt;
    if (post_id) {
      await this.props.getPost(post_id);
      if (this._isMounted && this.props.post) {
        this.setState({
          image: this.props.post.image,
          description: this.props.post.description,
        });
      }
    }
    console.log();
  }

  render() {
    const { receipt } = this.props;
    return this.state.profile ? (
      <Card>
        <CardItem>
          <Left>
            <CachedImage image={this.state.profile} style={styles.profile} />
            <Body>
              <Text style={{ fontWeight: "bold" }}>@{this.state.username}</Text>
            </Body>
          </Left>
          <Right>
            <Button>
              <CachedImage
                large
                square
                source={this.state.image}
                style={styles.image}
              />
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Text style={{ fontWeight: "bold" }}>Item:</Text>
          <Text>{this.state.description}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ fontWeight: "bold" }}>Total Sale Price:</Text>
          <Text>{receipt.total_price}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ fontWeight: "bold" }}>Price Paid:</Text>
          <Text>{receipt.amount_paid}</Text>
        </CardItem>
      </Card>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTempUser: (id) => dispatch(getTempUser(id)),
    getPost: (id) => dispatch(getPost(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    temp_user: state.user.temp_user,
    post: state.post.post,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);

const styles = StyleSheet.create({
  profile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  image: {},
});
