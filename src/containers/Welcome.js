import React, { Component } from 'react'
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Spinner
} from 'native-base'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

class Welcome extends React.Component {
  static navigationOptions = {
    // title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 36}}>Parcel Pintar</Text>
        <Text style={{fontSize: 10}}>Logo Here..</Text>
        <Text style={{fontSize: 16}}>Not just a parcel! (slogan)</Text>
        <Button title="Login" onPress={this.signInAsync} />
        <Text style={{fontSize: 10}}>Don't have an account?</Text>
        <TouchableHighlight
          onPress={()=> {
            props.navigation.navigate('Hero', {index: props.index})
          }}
        >
          <Text style={{fontSize: 10, color:'blue'}}>Register</Text>
        </TouchableHighlight>
        <View>
        </View>
      </View>
    );
  }

  signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: Welcome });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);