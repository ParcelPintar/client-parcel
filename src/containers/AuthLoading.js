import React, { Component } from 'react'
import { 
  AsyncStorage,
  View,
  StyleSheet,
  StatusBar
} from 'react-native'
import { 
  Spinner 
} from 'native-base'

export default class AuthLoading extends Component {
  constructor() {
    super();
    this.tokenCheck();
  }

  // Fetch the token from storage then navigate to our appropriate place
  tokenCheck = async () => {
    const token = await AsyncStorage.getItem('token');

    console.log('TOK', token);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Spinner />
        <StatusBar barStyle="default" />
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