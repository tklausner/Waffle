import React, { Component } from "react";
import { Container, Text, ListItem, Button } from "native-base";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";

import { newComment, getCommentsByPost } from "../../api/comment";
import { LoadingScreen } from "../loading/LoadingScreen";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      newComment: false,
    };
  }

  async uploadComment() {
    if (this.state.comment.length > 1) {
      const { user } = this.props;

      await this.props.newComment({
        post_id: this.props.post_id,
        user_id: user._id,
        username: user.username,
        content: this.state.comment,
      });
      this.comment_input.clear();
      this.setState({
        newComment: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.newComment && this.props.handleState) {
      this.setState({
        newComment: false,
      });
      this.props.handleState();
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
            this.setState({
              newComment: false,
            });
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
    newComment: (id) => dispatch(newComment(id)),
    getCommentsByPost: (id) => dispatch(getCommentsByPost(id)),
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
    marginBottom: "3%",
  },
});
