import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
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
import { deletePost, readPosts } from "../../api/post";
import { updateUser, getUser } from "../../api/user";

import { NavigationContext } from "@react-navigation/native";

import AsyncImage from "../images/AsyncImage";

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
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        saved: this.getSavedState(),
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      console.log("PRE", saved);
      if (!this.state.saved) {
        return false;
      }
      saved.splice(saved.indexOf(this.props.post._id), 1);
      console.log("POST", saved);
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
  render() {
    const { post } = this.props;
    const navigation = this.context;
    return (
      <Content style={styles.content}>
        <Card>
          <CardItem>
            <Left>
              <AsyncImage
                image={post.profile}
                style={styles.profile}
              ></AsyncImage>
              <Body>
                <Text>{post.username}</Text>
              </Body>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.props.deletePost(post._id);
                  this.props.readPosts();
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
            <AsyncImage image={post.image} style={styles.image}></AsyncImage>
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
          <CardItem>
            <FlatList
              data={post.comments}
              renderItem={_renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => null}
            />
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
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
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
    paddingBottom: "1%",
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
});
