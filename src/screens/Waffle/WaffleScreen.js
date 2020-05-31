import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";
import { Waffle } from "../../components/waffles/Waffle";

import globalStyles from "../../styles";

function WaffleScreen({ route }) {
  const { post } = route.params;
  return (
    <Container>
      <Waffle post={post} />
    </Container>
  );
}
export default WaffleScreen;
