import React, { Component } from 'react'
import { 
  View, 
  Button 
} from 'react-native'
import { 
  StatusBar, 
  Spinner 
} from 'native-base'

export default class Other extends Component {
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