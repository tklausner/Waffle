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
  Left,
  Body,
  Right,
  List,
  ListItem,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import ProfileFeed from "../../components/profile/ProfileFeed";

import CachedImage from "../../components/images/CachedImage";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";

import { updateUser } from "../../api/user";
import { uploadImageToFireBase, _processImage } from "../../utils";

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      feed: [],
      isRendering: true,
      selectedColor: "#00B8FA",
    };
  }

  componentDidMount() {
    this._renderFeed(this.props.user, "Waffles");
  }

  render() {
    const user = this.props.route.params.tempUser;
    return user ? (
      <Container>
        <Card transparent style={styles.profTop}>
          <CardItem>
            <Left>
              <TouchableOpacity
                style={styles.profImage}
                transparent
                onPress={this.pickImage}
              >
                <CachedImage image={user.profile} style={styles.profImage} />
              </TouchableOpacity>
              <Body>
                <Text style={styles.profName}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.profUsername}>@{user.username}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 15, paddingLeft: "5%" }}>
                {user.store_description}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this._renderFeed(user, "Store");
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "30%",
                    color:
                      this.state.selected === "Store"
                        ? this.state.selectedColor
                        : "#000",
                  }}
                >
                  Listed
                </Text>
              </Button>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this._renderFeed(user, "Saved");
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingRight: "30%",
                    color:
                      this.state.selected === "Saved"
                        ? this.state.selectedColor
                        : "#000",
                  }}
                >
                  Reviews
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        {!this.state.isRendering ? (
          <ProfileFeed posts={this.state.feed} />
        ) : (
          <Text>You have no posts</Text>
        )}
      </Container>
    ) : null;
  }
  _renderFeed = (user, val) => {
    this.setState({
      isRendering: true,
      selected: val,
    });
    var feed =
      val === "Store"
        ? user.store
        : val === "Saved"
        ? user.saved
        : val === "Waffles"
        ? user.waffles
        : null;
    this.setState(
      {
        feed: feed,
      },
      () => {
        this.setState({
          isRendering: false,
        });
      }
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

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
    borderRadius: 100,
    marginLeft: "-10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
