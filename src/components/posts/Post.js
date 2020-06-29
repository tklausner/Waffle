import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  View,
} from "react-native";
import {
  Container,
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";

import { connect } from "react-redux";
import { deletePost, readPosts, updatePost } from "../../api/post";
import { updateUser, getTempUser } from "../../api/user";

import { NavigationContext } from "@react-navigation/native";

import CachedImage from "../images/CachedImage";
import PostWaffle from "./PostWaffle";
import AddComment from "./AddComment";

const _renderItem = ({ item }) => {
  return (
    <ListItem style={[{ borderBottomWidth: 0 }, styles.comments]}>
      <Text style={[styles.comments, { color: "gray" }]}>{item.username}</Text>
      <Text style={[styles.comments]}>{item.content}</Text>
    </ListItem>
  );
};

class Post extends PureComponent {
  static contextType = NavigationContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      username: "",
      profile: "",
      comment: "",
      comments: [],
      tempUser: null,
      waffleType: "Main",
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        saved: this.getSavedState(),
      });
      await this.fetchPostUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  passProps(waffleState) {
    if (this.state.waffleType !== waffleState.waffleType) {
      this.setState({
        waffleType: waffleState.waffleType,
      });
    }
  }

  async fetchPostUser() {
    if (this._isMounted) {
      await this.props.getTempUser(this.props.post.user_id);
      this.setState({
        username: this.props.temp_user.username,
        profile: this.props.temp_user.profile,
        tempUser: this.props.temp_user,
      });
    }
  }

  navigateComments() {
    const navigation = this.context;
    const { post } = this.props;
    const { type } = this.props;
    if (type && this._isMounted) {
      switch (type) {
        case "Home":
        case "Home_Product":
          navigation.navigate("Home_Comments", {
            post_id: post._id,
          });
          return;
        case "Explore_Product":
          navigation.navigate("Explore_Comments", {
            post_id: post._id,
          });
          return;
        case "Profile_Product":
          navigation.navigate("Profile_Comments", {
            post_id: post._id,
          });
          return;
        default:
          return;
      }
    }
  }

  addToSaved() {
    if (this._isMounted) {
      let saved = this.props.user.saved.slice();
      saved.splice(saved.length - 1, 0, this.props.post._id);
      this.props.updateUser({
        saved: saved,
        _id: this.props.user._id,
      });

      this.setState({
        saved: true,
      });
    }
  }

  removeFromSaved() {
    if (this._isMounted) {
      let saved = this.props.user.saved.slice();
      if (!this.state.saved) {
        return false;
      }
      saved.splice(saved.indexOf(this.props.post._id), 1);
      this.props.updateUser({
        saved: saved,
        _id: this.props.user._id,
      });
      this.setState({
        saved: false,
      });
    }
  }

  getSavedState() {
    if (this._isMounted) {
      return this.props.user.saved.indexOf(this.props.post._id) > -1;
    }
  }

  refresh() {
    if (this._isMounted) {
      this.props.readPosts();
    }
  }

  render() {
    const { post } = this.props;
    const navigation = this.context;
    const { tempUser } = this.state;
    return tempUser ? (
      <Card style={styles.content}>
        <CardItem>
          <Left>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile", { tempUser })}
            >
              <CachedImage image={this.state.profile} style={styles.profile} />
            </TouchableOpacity>
            <Body>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile", { tempUser })}
              >
                <Text style={styles.username}>{this.state.username}</Text>
              </TouchableOpacity>
            </Body>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => {
                //this.props.deletePost(post._id);
                this.refresh();
              }}
            >
              <MaterialIcons
                name="more-horiz"
                style={[{ fontSize: 40 }, globalStyles.wGray]}
              />
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Text style={styles.category}>#{post.category}</Text>
        </CardItem>
        <CardItem>
          <CachedImage image={post.image} style={styles.image}></CachedImage>
        </CardItem>
        <CardItem>
          <PostWaffle
            handleState={this.passProps.bind(this)}
            post={post}
            navigation={navigation}
          />
        </CardItem>
        <CardItem>
          <Left style={[styles.barLeft]}>
            <Button
              transparent
              onPress={() => {
                if (this.state.saved) {
                  this.removeFromSaved();
                } else {
                  this.addToSaved();
                }
              }}
            >
              <MaterialIcons
                name={this.state.saved ? "bookmark" : "bookmark-border"}
                style={{ fontSize: 32 }}
              />
            </Button>
            <Button transparent>
              <MaterialIcons name="send" style={{ fontSize: 32 }} />
            </Button>
          </Left>
          <TouchableOpacity
            style={styles.barRightTouchable}
            onPress={() => {
              navigation.navigate("Waffle", { post: post });
            }}
          >
            <Right style={[styles.barRight, styles.barStyle]}>
              <View style={styles.wafflesRemainingView}>
                <MaterialIcons name="pie-chart" style={styles.barRightIcon} />
                <Text style={styles.barRightText}>
                  {this.state.waffleType === "Main"
                    ? post.main_spots
                    : post.mini_spots}
                </Text>
              </View>
              <View style={styles.wafflesRemainingView}>
                <MaterialIcons
                  name="monetization-on"
                  style={styles.barRightIcon}
                />
                <Text style={styles.barRightText}>
                  {this.state.waffleType === "Main"
                    ? post.main_price
                    : post.mini_price}
                </Text>
              </View>
            </Right>
          </TouchableOpacity>
        </CardItem>
        <CardItem>
          <Text>{post.description}</Text>
        </CardItem>

        <CardItem
          button
          style={styles.viewMore}
          onPress={() => {
            this.navigateComments();
          }}
        >
          <Text style={styles.viewMore}>View comments</Text>
        </CardItem>
      </Card>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    deletePost: (id) => dispatch(deletePost(id)),
    readPosts: () => dispatch(readPosts()),
    getTempUser: (id) => dispatch(getTempUser(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    temp_user: state.user.temp_user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: "-1%",
  },
  wafflesRemainingView: {
    flex: 0,
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
  },
  barStyle: {
    borderWidth: 3,
    borderColor: "#00B8FA",
    borderRadius: 90,
    borderTopWidth: 0,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
  },
  barLeft: {
    paddingLeft: "2%",
  },
  barRight: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  barRightText: {
    paddingLeft: "5%",
    fontSize: 25,
    fontWeight: "600",
  },
  barRightIcon: {
    fontSize: 25,
    marginTop: "5%",
  },
  viewMore: {
    fontSize: 15,
    color: "lightgray",
    justifyContent: "space-around",
    paddingTop: "1%",
    paddingBottom: "2%",
  },
  waffleButton: {
    color: "red",
    justifyContent: "space-around",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  image: {
    height: Dimensions.get("window").width,
    flex: 1,
    marginLeft: "0%",
    marginTop: "-5%",
    resizeMode: "contain",
    borderRadius: 70,
    marginBottom: "-10%",
  },
  category: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#00B8FA",
  },
  commentContainer: {
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "300",
  },
});
