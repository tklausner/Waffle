import React from "react";
import { Message } from "./Message";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item }) => <Message message={item} key={item.id} />;

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
