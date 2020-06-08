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
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from "native-base";
import { StyleSheet, Image } from "react-native";

import { connect } from "react-redux";

import ProfileFeed from "../../components/profile/ProfileFeed";

import AsyncImage from "../../components/images/AsyncImage";
import { LoadingScreen } from "../../components/loading/LoadingScreen";

import { readPostsByUser } from "../../api/post";

class ProfileScreen extends Component {
  componentDidMount() {
    const { _id } = this.props.user;
    if (_id) {
      this.props.readPostsByUser(_id);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isRendering: true,
    };
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Card transparent style={styles.profTop}>
          <CardItem>
            <Left>
              <AsyncImage
                image={this.props.user.profile}
                style={styles.profImage}
              />
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
                  this.setState({
                    isRendering: true,
                  });
                  const feed = this.props.posts;
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
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "15%",
                    color: "#000000",
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
                  this.setState({
                    isRendering: true,
                  });
                  const feed = _renderFeed(user, "Store");
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
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: "15%",
                    color: "#000000",
                  }}
                >
                  Market
                </Text>
              </Button>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.setState({
                    isRendering: true,
                  });
                  const feed = _renderFeed(user, "Saved");
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
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingRight: "30%",
                    color: "#000000",
                  }}
                >
                  Saved
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        {!this.state.isRendering && this.state.feed.length > 0 ? (
          <ProfileFeed posts={this.state.feed} />
        ) : (
          <Text>You have no posts</Text>
        )}
      </Container>
    );
  }
}

const _renderFeed = (user, val) => {
  switch (val) {
    case "Store":
      return user.store;
    case "Saved":
      return user.saved;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    posts: state.post.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readPostsByUser: (id) => dispatch(readPostsByUser(id)),
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
    borderRadius: 200 / 2,
    marginLeft: "-10%",
  },
});
