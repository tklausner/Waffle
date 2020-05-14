import React from "react";
import { MessagePreview } from "./MessagePreview";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item }) => (
  <MessagePreview message={item} key={item.id} />
);

export function MessageList({ messages }) {
  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>Ethan's a Bitch</Text>}
    />
  );
}

module.export = MessageList;
