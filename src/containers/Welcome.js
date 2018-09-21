import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Text, 
  Button 
} from 'native-base'

export default class Welcome extends Component {
  static navigationOptions = {
    // title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 36}}>Parcel Pintar</Text>
        <Text style={{fontSize: 10}}>Logo Here..</Text>
        <Text style={{fontSize: 16}}>Not just a parcel! (slogan)</Text>
        <View style={{ alignSelf: "center" }}>
          <Button rounded info onPress={this.signInAsync}> 
            <Text> Login </Text>
          </Button>
        </View>
        <Text style={{fontSize: 10}}>Don't have an account?</Text>
        <TouchableHighlight
          onPress={()=> {
            props.navigation.navigate('Register', {index: props.index})
          }}
        >
          <Text style={{fontSize: 10, color:'blue'}}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }

  signInAsync = async () => {
    await AsyncStorage.setItem('token', 'TEST');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});