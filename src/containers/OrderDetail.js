import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
} from 'react-native'
import {
  Text, 
  Button 
} from 'native-base'

export default class OrderDetail extends Component {
  static navigationOptions = {
    title: 'OrderDetail',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button rounded info onPress={() => {
          this.props.navigation.navigate('OrderHistory')
          }}
        >
          <Text> BACK </Text>
        </Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});