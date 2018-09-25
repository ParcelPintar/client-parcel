import React, { Component } from 'react'
import {
  Button,
  Text,
  View
} from 'native-base'

export default class Checkout extends Component {

  static navigationOptions = {
    title: 'Your Cart'
  };

  render() {
    return (
      <View>
        <Button info onPress={() => this.props.navigation.navigate('Maps')}>
          <Text>Checkout</Text>
        </Button>
        <Text>{JSON.stringify(this.props.navigation.getParam('cart'))}</Text>
      </View>
    )
  }
}
