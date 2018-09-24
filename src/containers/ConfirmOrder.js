import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
} from 'react-native'
import {
  Text, 
  Button 
} from 'native-base'

export default class ConfirmOrder extends Component {
  static navigationOptions = {
    title: 'ConfirmOrder',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          <Button rounded info onPress={() => {
            this.props.navigation.navigate('Maps')
            }}
          >
            <Text> BACK </Text>
          </Button>
        </View>
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