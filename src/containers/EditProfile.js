import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
} from 'react-native'
import {
  Text, 
  Button 
} from 'native-base'

export default class EditProfile extends Component {
  static navigationOptions = {
    title: 'EditProfile',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button rounded info onPress={() => {
          this.props.navigation.navigate('Profile')
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