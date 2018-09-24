import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
} from 'react-native'
import {
  Text, 
  Button 
} from 'native-base'

export default class OnGoingOrder extends Component {
  static navigationOptions = {
    title: 'OnGoingOrder',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button rounded info onPress={() => {
          this.props.navigation.navigate('OrderHistory')
          }}
        >
          <Text> OrderHistory </Text>
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