import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
  Text
} from 'react-native'
import {
  // Text, 
  Button 
} from 'native-base'

export default class ConfirmOrder extends Component {
  constructor(){
    super()
    this.state = {
      distance: null,
      ETA: null,
      item: null
    }
  }

  static navigationOptions = {
    title: 'Order Detail',
  };

  componentDidMount = () => {
    this.setState({
      distance: this.props.navigation.getParam('distance'),
      ETA: this.props.navigation.getParam('ETA'),
      item: this.props.navigation.getParam('item')
    })
  }
  
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text>AA</Text>
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