import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  View,
  Image,
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProgressBar from "react-native-progress/Bar";

import globalStyles from "../../styles";
import WaffleIcon from "../../../assets/images/icon-128.png";

import { connect } from "react-redux";
import { deletePost, readPosts, updatePost, getPost } from "../../api/post";
import { updateUser, getTempUser } from "../../api/user";

import { NavigationContext } from "@react-navigation/native";

import CachedImage from "../images/CachedImage";
import AddComment from "./AddComment";

import CardFlip from "react-native-card-flip";

import Waffle from "../waffles/Waffle";

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
      liked: false,
      username: "",
      profile: "",
      comment: "",
      comments: [],
      tempUser: null,
      waffleType: "Main",
      progress: 0,
      number_of_spots: 0,
      price: 0,
      showWaffle: false,
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        saved: this.getSavedState(),
      });
      await this.setWaffleProgress(this.props.post.waffles_remaining);
      await this.fetchPostUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  setWaffleProgress(wr) {
    const { post } = this.props;
    if (post) {
      let progress = (post.main_spots - wr) / post.main_spots;
      this.setState({
        progress: progress > 0 && progress <= 1 ? progress : 0,
      });
    }
  }

  addToLiked() {
    if (this._isMounted)
      this.setState({
        liked: true,
      });
  }

  removeFromLiked() {
    if (this._isMounted)
      this.setState({
        liked: false,
      });
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

  async quickPurchase() {
    const { post } = this.props;
    if (
      this.state.number_of_spots > 0 &&
      this.state.number_of_spots <= post.waffles_remaining
    ) {
      let data = post.wafflers.slice();
      for (let i = 0, j = 0, k = 0; j < this.state.number_of_spots; i++) {
        if (post.wafflers[k]) {
          if (i != post.wafflers[k]["spot_number"]) {
            data.splice(data.length - 1, 0, {
              spot_number: i,
              username: this.props.user.username,
              user_id: this.props.user._id,
            });
            j += 1;
          } else {
            k += 1;
          }
        } else {
          data.splice(data.length - 1, 0, {
            spot_number: i,
            username: this.props.user.username,
            user_id: this.props.user._id,
          });
          j += 1;
        }
      }

      data.sort((a, b) => (a.spot_number > b.spot_number ? 1 : -1));
      await this.props.updatePost({
        _id: post._id,
        wafflers: data,
        waffles_remaining: post.waffles_remaining - this.state.number_of_spots,
      });
      this.addWaffleToUser();
      this.setWaffleProgress(
        post.waffles_remaining - this.state.number_of_spots
      );
    }
    this.setState({
      showWaffle: false,
    });
  }

  async addWaffleToUser() {
    if (this._isMounted) {
      const { user, post } = this.props;
      let updatedWaffles = user.waffles.slice();
      let index = updatedWaffles.findIndex((i) => i.post_id === post._id);
      if (index < 0) {
        updatedWaffles.splice(updatedWaffles.length - 1, 0, {
          post_id: post._id,
          spots: this.state.number_of_spots,
        });
      } else {
        let waffle = updatedWaffles[index];
        updatedWaffles.splice(index, 1, {
          post_id: post._id,
          spots: waffle.spots + this.state.number_of_spots,
        });
      }
      await this.props.updateUser({
        _id: user._id,
        waffles: updatedWaffles,
      });

      this.setState({
        number_of_spots: 0,
      });
    }
  }

  number_button() {
    return (
      <Button
        transparent
        style={styles.pickerNumber}
        onPress={() => {
          this.quickPurchase();
        }}
      >
        <Text
          style={{
            color: "#00B8FA",
            fontSize: 28,
            fontWeight: "600",
            marginLeft: "-5%",
          }}
        >
          {this.state.number_of_spots}
        </Text>
      </Button>
    );
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

        <CardFlip
          style={{
            height: Dimensions.get("window").width,
          }}
          ref={(card) => (this.card = card)}
        >
          <TouchableOpacity
            style={styles.image}
            onPress={() => this.card.flip()}
          >
            <CachedImage image={post.image} style={styles.image}></CachedImage>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: Dimensions.get("window").width,
            }}
            onPress={() => this.card.flip()}
          >
            <Waffle tempUser={tempUser} post={post} />
          </TouchableOpacity>
        </CardFlip>

        <CardItem
          style={{
            backgroundColor: "rgba(255,255,255,.95)",
            paddingBottom: 20,
          }}
        >
          <View style={styles.container}>
            <Button
              transparent
              style={styles.waffleContainer}
              onPress={() => {
                this.setState({
                  showWaffle: !this.state.showWaffle,
                });
              }}
            >
              <Image style={styles.waffleButton} source={WaffleIcon}></Image>
            </Button>

            <View style={styles.container}>
              {this.number_button()}
              <View style={{ flexDirection: "row", marginLeft: "1%" }}>
                <Button
                  transparent
                  style={styles.changeSpot}
                  onPress={() => {
                    {
                      this.state.number_of_spots > 0
                        ? this.setState({
                            number_of_spots: this.state.number_of_spots - 1,
                          })
                        : null;
                    }
                  }}
                >
                  <MaterialIcons
                    name="remove-circle-outline"
                    style={styles.changeSpotText}
                  />
                </Button>
                <Button
                  transparent
                  style={styles.changeSpot}
                  onPress={() => {
                    this.setState({
                      number_of_spots: this.state.number_of_spots + 1,
                    });
                  }}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    style={styles.changeSpotText}
                  />
                </Button>
              </View>
            </View>
          </View>

          <View style={styles.waffleValueView}>
            <MaterialIcons
              name="monetization-on"
              style={styles.waffleValueIcon}
            />
            <Text style={styles.waffleValueText}>{post.value}</Text>
          </View>
        </CardItem>
        <CardItem style={{ marginTop: "-2%" }}>
          <Left style={styles.barLeft}>
            <Button
              transparent
              onPress={() => {
                if (this.state.liked) {
                  this.removeFromLiked();
                } else {
                  this.addToLiked();
                }
              }}
            >
              <MaterialIcons
                name={this.state.liked ? "favorite" : "favorite-border"}
                style={{ fontSize: 32 }}
              />
            </Button>
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
          </Left>
          <TouchableOpacity
            style={styles.barRightTouchable}
            onPress={async () => {
              await this.props.getPost(post._id);
              navigation.navigate("Waffle", {
                tempUser: tempUser,
              });
            }}
          >
            <Right style={styles.barRight}>
              <View style={styles.wafflesRemainingView}>
                <MaterialIcons name="pie-chart" style={styles.spotsLeft} />
                <ProgressBar
                  style={styles.progressBar}
                  progress={this.state.progress}
                  height={26}
                />
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
            navigation.navigate("Comments", {
              post_id: post._id,
            });
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
    getPost: (id) => dispatch(getPost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
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
    paddingLeft: "5%",
  },
  waffleValueView: {
    flex: 0,
    flexDirection: "row",
    position: "absolute",
    right: "5%",
  },
  waffleValueText: {
    paddingLeft: "1%",
    fontSize: 28,
    fontWeight: "600",
    color: "#999",
  },
  waffleValueIcon: {
    fontSize: 25,
    marginTop: "6%",
    color: globalStyles.wBlue.color,
    borderColor: globalStyles.wBlue.color,
    borderRadius: 15,
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
    paddingLeft: "1%",
    fontSize: 25,
    fontWeight: "600",
  },
  progressBar: {
    borderWidth: 3,
    borderColor: "#999",
    width: 135,
    borderRadius: 20,
    marginLeft: "5%",
  },
  progressBarOverlay: {
    borderWidth: 1,
    borderColor: "#999",
    height: 25,
    backgroundColor: globalStyles.wBlue.color,
    borderRadius: 20,
  },
  progressText: {
    fontWeight: "600",
    color: "#000",
    marginLeft: "10%",
    textAlign: "center",
  },
  spotsLeft: {
    fontSize: 25,
    color: "#999",
    borderColor: globalStyles.wBlue.color,
    borderRadius: 15,
    borderWidth: 3,
  },
  viewMore: {
    fontSize: 15,
    color: "lightgray",
    justifyContent: "space-around",
    paddingTop: "1%",
    paddingBottom: "2%",
  },
  waffleButton: {
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
    marginLeft: "-5.5%",
    marginRight: "-5.5%",
    marginTop: "-2%",
    resizeMode: "contain",
    marginBottom: "-20%",
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
  waffleStyle: {
    borderRadius: 90,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    backgroundColor: "#fff",
  },
  waffleButton: {
    width: "100%",
    resizeMode: "contain",
    height: "120%",
    backgroundColor: "transparent",
  },
  waffleContainer: {
    width: 50,
    marginRight: "5%",
    marginTop: "2%",
    paddingTop: 0,
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
  },
  changeSpot: {
    borderColor: "#00B8FA",
    textAlign: "center",
    width: 48,
    height: 48,
    marginRight: "-5%",
    backgroundColor: "transparent",
    borderRadius: 45,
    borderColor: "#00B8FA",
  },
  changeSpotText: {
    fontSize: 40,
    color: "#00B8FA",
    paddingLeft: "6%",
  },
  pickerNumber: {
    borderColor: "#00B8FA",
    borderWidth: 3,
    borderRadius: 45,
    width: 48,
    height: 48,
    textAlign: "center",
    color: "#00B8FA",
    marginRight: "5%",
  },
});
