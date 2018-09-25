import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
} from 'react-native'
import {
  Text, 
  Button 
} from 'native-base'
import OrderList from "../components/Orderlist";
import Order from '../components/Order';


export default class OnGoingOrder extends Component {
  static navigationOptions = {
    title: 'OnGoingOrder',
  };

  render() {
    return (
      <View style={styles.container}>
        <OrderList/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
});