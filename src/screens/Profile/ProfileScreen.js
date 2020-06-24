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


class ProfileScreen extends Component {
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

  pickImage = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        this.props.updateUser({
          profile: "test/" + _processImage(result.uri),
          _id: this.props.user._id,
        });
        uploadImageToFireBase({
          uri: result.uri,
        });
      }

      console.log(this.props.user.profile);
    }
  };

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Card transparent style={styles.profTop}>
          <CardItem>
            <Left>
              <TouchableOpacity
                style={styles.profImage}
                transparent
                onPress={this.pickImage}
              >
                <CachedImage
                  image={this.props.user.profile}
                  style={styles.profImage}
                />
              </TouchableOpacity>
              <Body>
                <Text style={styles.profName}>
                  {this.props.user.first_name} {this.props.user.last_name}
                </Text>
                <Text style={styles.profUsername}>
                  @{this.props.user.username}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 15, paddingLeft: "5%" }}>
                {this.props.user.store_description}
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
                  this._renderFeed(user, "Waffles");
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "15%",
                    color:
                      this.state.selected === "Waffles"
                        ? this.state.selectedColor
                        : "#000",
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
                  this._renderFeed(user, "Store");
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "15%",
                    color:
                      this.state.selected === "Store"
                        ? this.state.selectedColor
                        : "#000",
                  }}
                >
                  Listed
                </Text>
              </Button>
            </Body>
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
                  Saved
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
    );
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
    ); console.log(this.state.feed, this.state.isRendering)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

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
