import React, { Component, Fragment } from 'react';
import { StyleSheet, View } from "react-native";
import { Form, Item, Input, Label } from 'native-base';
import Order from "./Order";
const styles = StyleSheet.create({
    orderBox:{
        width:"95%",
        backgroundColor : "white"
    }
})

export default class OrderList extends Component {
  
  render() {
    return (
      <Fragment>
        <Order></Order>
      </Fragment>
    );
  }
}