import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Text, 
  Button 
} from 'native-base'

export default class Welcome extends Component {
  // static navigationOptions = {
  //   // title: 'Please sign in',
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 36}}>Parcel Pintar</Text>
        <Text style={{fontSize: 10}}>Logo Here..</Text>
        <Text style={{fontSize: 16}}>Not just a parcel! (slogan)</Text>
        <View style={{ alignSelf: "center" }}>
          <Button rounded info onPress={() => {
            this.props.navigation.navigate('Login')
          }}> 
            <Text> Login </Text>
          </Button>

          <Button rounded info onPress={() => {
            this.props.navigation.navigate('Maps')
          }}> 
            <Text> MAPS </Text>
          </Button>
        </View>
        <Text style={{fontSize: 10}}>Don't have an account?</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('Register')
          }}
        >
          <Text style={{fontSize: 10, color:'blue'}}>Register</Text>
        </TouchableHighlight>
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