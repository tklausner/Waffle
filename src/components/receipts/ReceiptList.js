import React from "react";
import Receipt from "./Receipt";
import { Content, Container, Text } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import { EmptyScreen } from "../loading/EmptyScreen";

const renderItem = ({ item }) => <Receipt receipt={item} key={item._id} />;

export function ReceiptList({ receipts }) {
  return (
    <FlatList
      data={receipts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={() => (
        <EmptyScreen content="You have no past purchases" />
      )}
    />
  );
}

module.export = ReceiptList;
