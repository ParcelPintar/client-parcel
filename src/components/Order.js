import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Form, Item, Input, Label } from "native-base";

const styles = StyleSheet.create({
  orderBox: {
    width: "95%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5
  }
});

export default class Order extends Component {
  render() {
    return (
      <View style={styles.orderBox}>
        <Text>Pondok Indah, Cinere</Text>
        <Text>9 September 2018</Text>
        <Text>Ongoing</Text>
      </View>
    );
  }
}
