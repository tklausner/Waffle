import React, { Component } from "react";
import Post from "../../components/posts/Post";
import { Container, Content } from "native-base";
import { StyleSheet, Text } from "react-native";

import { connect } from "react-redux";
import { getPost } from "../../api/post";

import { LoadingScreen } from "../../components/loading/LoadingScreen";

class ProductScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const { _id } = this.props.route.params.post;
    if (_id && this._isMounted) {
      this.setState({
        loading: true,
      });
      await this.props.getPost(_id);
      this.setState({
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return !this.state.loading ? (
      <Content>
        <Post post={this.props.post} type={this.props.route.name} />
      </Content>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post_id) => dispatch(getPost(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
