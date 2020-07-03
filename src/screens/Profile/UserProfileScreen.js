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
import { Asset } from "react-native-unimodules";

import { updateUser } from "../../api/user";
import { uploadImageToFireBase, _processImage } from "../../utils";
import { ReviewList } from "../../components/Reviews/ReviewList";

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      selectedColor: "#00B8FA",
      storeSelected: true,
    };
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
                  this.setState({
                    storeSelected: true,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "30%",
                    color: this.state.storeSelected
                      ? this.state.selectedColor
                      : "#000",
                  }}
                >
                  Store
                </Text>
              </Button>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.setState({
                    storeSelected: false,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingRight: "30%",
                    color: !this.state.storeSelected
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
        {this.state.storeSelected ? (
          <ProfileFeed posts={user.store} route={"Home_Product"} />
        ) : !this.state.storeSelected ? (
          <ReviewList
            reviews={user.reviews}
            empty={`@${user.username} has no reviews`}
          />
        ) : (
          <Text>You have no posts</Text>
        )}
      </Container>
    ) : null;
  }
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
