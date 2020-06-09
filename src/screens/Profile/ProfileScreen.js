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
    this.setState({
      isRendering: true,
      selected: "Waffles",
    });
    const feed = _renderFeed(this.props.user, "Waffles");
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
                    selected: "Waffles",
                  });
                  const feed = _renderFeed(user, "Waffles");
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
                  this.setState({
                    isRendering: true,
                    selected: "Store",
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
                    color:
                      this.state.selected === "Store"
                        ? this.state.selectedColor
                        : "#000",
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
                    selected: "Saved",
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
}

const _renderFeed = (user, val) => {
  console.log(val);
  switch (val) {
    case "Store":
      return user.store;
    case "Saved":
      return user.saved;
    case "Waffles":
      return user.waffles;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);

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
