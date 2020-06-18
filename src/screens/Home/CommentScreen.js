import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";

import { LoadingScreen } from "../../components/loading/LoadingScreen";
import { CommentList } from "../../components/posts/CommentList";
import AddComment from "../../components/posts/AddComment";

class CommentScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        comments: this.props.route.params.comments,
      });
    }
  }

  async refresh(_id) {
    //await this.props.getPost(_id);
    if (this.state.comments === this.props.post.comments) {
      return false;
    }
    if (this._isMounted) {
      this.setState({
        comments: this.props.post.comments,
      });
    }
    return true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { post_id } = this.props.route.params;
    return this.state.comments ? (
      <Container>
        <CommentList comments={this.state.comments} />
        <AddComment comments={this.state.comments} post_id={post_id} />
      </Container>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(getPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);

const styles = StyleSheet.create({});
