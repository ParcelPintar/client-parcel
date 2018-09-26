import React, { Component } from 'react'
import PushNotification from 'react-native-push-notification';
import { View, Text, StyleSheet, Picker, AppState, Platform } from 'react-native';

import PushController from './PushController';

export default class PushNotif extends Component {
  constructor(){
    super()
    this.state = {
      seconds: 5
    }
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this.handleChange)
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleChange)
  }

  handleChange = (appState) => {
    if (appState === 'background') {
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
        playSound: true,
        soundName: 'default'
      });
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds.
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({ seconds })}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <PushController />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 100,
  },
});