import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";

import globalStyles from "../styles";

function MessagingScreen({ route }) {
  const { id, content } = route.params;
  return (
    <Container>
      <Text>{content}</Text>
    </Container>
  );
}
export default MessagingScreen;
