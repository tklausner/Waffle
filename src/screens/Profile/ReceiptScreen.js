import React, { Component } from "react";
import { Container } from "native-base";
import { connect } from "react-redux";

import { ReceiptList } from "../../components/receipts/ReceiptList";

class ReceiptScreen extends Component {
  render() {
    const { receipts } = this.props.user;
    return (
      <Container>
        <ReceiptList receipts={receipts} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(ReceiptScreen);
