import React, { Component } from "react";
import { Container } from "native-base";
import { connect } from "react-redux";

import { ReviewList } from "../../components/Reviews/ReviewList";

class ReviewScreen extends Component {
  render() {
    const { reviews } = this.props.user;
    return (
      <Container>
        <ReviewList reviews={reviews} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(ReviewScreen);
