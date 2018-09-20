import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Welcome from './src/containers/Welcome'

export default class App extends Component {
  render() {
    return (
      <Welcome />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
