import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../styles";

import { connect } from "react-redux";
import { deletePost, readPosts, updatePost } from "../../api/post";
import { updateUser, getTempUser } from "../../api/user";

import { NavigationContext } from "@react-navigation/native";

import CachedImage from "../images/CachedImage";

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
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        saved: this.getSavedState(),
      });
      this.fetchPostUser();
      this.fetchComments();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async fetchComments() {
    this.setState({
      comments: this.props.post.comments.slice(-3),
    });
  }

  async fetchPostUser() {
    await this.props.getTempUser(this.props.post.user_id);
    this.setState({
      username: this.props.temp_user.username,
      profile: this.props.temp_user.profile,
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

  reset() {
    this.comment_input.clear();
    this.setState({
      comment: "",
    });
  }

  refresh() {
    this.props.readPosts();
  }

  async uploadComment() {
    const { post } = this.props;
    if (this.state.comment) {
      let comments = post.comments.slice();
      comments.splice(comments.length - 1, 0, {
        user_id: this.props.user._id,
        username: this.props.user.username,
        content: this.state.comment,
      });
      const { _id } = post;
      await this.props.updatePost({
        comments: comments,
        _id: _id,
      });
      this.fetchComments();
      this.reset();
      this.refresh();
    }
  }

  render() {
    const { post } = this.props;
    const navigation = this.context;
    return (
      <Content style={styles.content}>
        <Card>
          <CardItem>
            <Left>
              <CachedImage image={this.state.profile} style={styles.profile} />
              <Body>
                <Text>{this.state.username}</Text>
              </Body>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.props.deletePost(post._id);
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
            <Left style={styles.bar}>
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
                  style={styles.bar}
                />
              </Button>
              <Button transparent>
                <MaterialIcons name="send" style={styles.bar} />
              </Button>
            </Left>
            <Body></Body>
            <Right
              style={[
                { flexDirection: "row", justifyContent: "space-around" },
                styles.bar,
              ]}
            >
              <Text style={styles.bar}>
                <MaterialIcons name="pie-chart" style={styles.bar} />
                {post.waffles_remaining}
              </Text>
              <Text style={styles.bar}>
                <MaterialIcons name="monetization-on" style={styles.bar} />
                {post.value}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>{post.description}</Text>
          </CardItem>
          <CardItem
            button
            style={styles.waffleButton}
            onPress={() => {
              navigation.navigate("Waffle", {
                post: post,
              });
            }}
          >
            <Text style={styles.waffleButton}>WaffleButton</Text>
          </CardItem>
          <CardItem style={styles.commentsContainer}>
            <FlatList
              data={this.state.comments}
              renderItem={_renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => null}
              initialNumToRender={3}
            />
          </CardItem>
          <CardItem style={styles.commentContainer}>
            <TextInput
              ref={(input) => {
                this.comment_input = input;
              }}
              style={styles.comment}
              placeholder="Write a comment ..."
              autoCorrect={true}
              keyboardAppearance={"light"}
              placeholderTextColor={"#DDD"}
              multiline={true}
              textAlignVertical={"top"}
              value={this.state.comment}
              onChangeText={(text) => {
                this.setState({ comment: text });
              }}
            />
            <Button
              transparent
              style={styles.submitComment}
              onPress={() => {
                this.uploadComment();
              }}
            >
              <MaterialIcons name="send" style={styles.bar} />
            </Button>
          </CardItem>
          <CardItem button style={styles.viewMore}>
            <Text style={styles.viewMore}>View more comments</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    deletePost: (id) => dispatch(deletePost(id)),
    readPosts: () => dispatch(readPosts()),
    getTempUser: (id) => dispatch(getTempUser(id)),
    updatePost: (id) => dispatch(updatePost(id)),
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
    marginTop: "-2%",
    marginBottom: "0%",
    flex: 0,
    borderTopWidth: 0,
  },
  bar: {
    fontSize: 20,
    marginTop: "-2%",
  },
  barRight: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  comments: {
    marginLeft: "0%",
    paddingBottom: "1%",
    paddingTop: "1%",
    paddingRight: "5%",
    fontSize: 15,
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
    borderRadius: 400 / 2,
  },
  image: {
    height: 345,
    width: "110%",
    flex: 1,
    marginLeft: "0%",
    resizeMode: "contain",
  },
  category: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#00B8FA",
  },

  comment: {
    width: "70%",
    borderRadius: 5,
    height: 32,
    justifyContent: "center",
    backgroundColor: "#EEE",
    color: "black",
    fontSize: 16,
    paddingLeft: 8,
  },
  submitComment: {
    marginLeft: "2%",
  },
  commentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
