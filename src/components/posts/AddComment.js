import React, { Component } from "react";
import { Container, Text, ListItem, Button } from "native-base";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";

import { updatePost, readPosts } from "../../api/post";
import { LoadingScreen } from "../loading/LoadingScreen";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  async uploadComment() {
    const { comments } = this.props;
    const { user } = this.props;

    if (this.state.comment.length > 0 && comments) {
      let commentsUpdated = comments.slice();
      commentsUpdated.splice(commentsUpdated.length - 1, 0, {
        user_id: user._id,
        username: user.username,
        content: this.state.comment,
      });
      await this.props.updatePost({
        comments: commentsUpdated,
        _id: this.props.post_id,
      });
      this.comment_input.clear();
      this.props.readPosts();
    }
  }
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (id) => dispatch(updatePost(id)),
    readPosts: () => dispatch(readPosts()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);

const styles = StyleSheet.create({
  bar: {
    fontSize: 20,
    marginTop: "-2%",
  },
  comment: {
    width: "70%",
    borderRadius: 5,
    height: 32,
    justifyContent: "center",
    backgroundColor: "#EEE",
    color: "black",
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: "10%",
  },
  submitComment: {
    marginLeft: "3%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
