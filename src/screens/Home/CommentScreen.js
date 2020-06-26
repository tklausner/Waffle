import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";

import { EmptyScreen } from "../../components/loading/EmptyScreen";
import { LoadingScreen } from "../../components/loading/LoadingScreen";
import { CommentList } from "../../components/posts/CommentList";
import AddComment from "../../components/posts/AddComment";
import { getCommentsByPost } from "../../api/comment";

class CommentScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      loading: false,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({
      loading: true,
    });
    const { post_id } = this.props.route.params;
    await this.props.getCommentsByPost(post_id);
    if (this._isMounted) {
      this.setState({
        comments: this.props.comments,
      });
    }
    this.setState({
      loading: false,
    });
  }

  async refresh() {
    const { post_id } = this.props.route.params;
    await this.props.getCommentsByPost(post_id);
    if (this.props.comments && this._isMounted) {
      this.setState({
        comments: this.props.comments,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  passProps() {
    this.refresh();
  }

  render() {
    const { post_id } = this.props.route.params;
    return !this.state.loading ? (
      <Container>
        {this.state.comments && this.state.comments.length > 0 ? (
          <CommentList comments={this.state.comments} />
        ) : (
          <EmptyScreen content={"Be the first to comment!"} />
        )}
        <AddComment post_id={post_id} handleState={this.passProps.bind(this)} />
      </Container>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comment.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsByPost: (id) => dispatch(getCommentsByPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);

const styles = StyleSheet.create({});
