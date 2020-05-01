import React from "react";
import { Container, Content, Button, Text } from "native-base";

export default function MessagingScreen({ navigation }) {
  return (
    <Container>
      <Text>TEXT</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </Container>
  );
}
module.export = MessagingScreen;
