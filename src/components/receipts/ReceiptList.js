import React from "react";
import { Receipt } from "./Receipt";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";

const renderItem = ({ item }) => <Receipt receipt={item} key={item.id} />;

export function ReceiptList({ receipts }) {
  return (
    <FlatList
      data={receipts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text>Teddy's a Bitch</Text>}
    />
  );
}

module.export = ReceiptList;
