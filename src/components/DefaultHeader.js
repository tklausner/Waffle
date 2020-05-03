import React from "react";
import { Header, Body, Title } from "native-base";
import styles from "../styles";

export function DefaultHeader() {
  return (
    <Header>
      <Body>
        <Title style={[styles.header, styles.wBlue]}>Waffle</Title>
      </Body>
    </Header>
  );
}

module.export = DefaultHeader;
