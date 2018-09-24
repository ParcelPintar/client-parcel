import React, { Component } from 'react'
import { 
  Button,
  Text,
  Right
} from 'native-base'
import { 
  StyleSheet, 
  View,
  AsyncStorage
} from 'react-native'

import LoginForm from '../components/LoginForm'

export default class Login extends Component {
  constructor (){
    super ()
    this.state = {
      email: '',
      password: ''
    }
  }
  static navigationOptions = {
    title: 'Login',
  };

  setEmail = (e) => {
    this.setState({
      email: e
    })
  }

  setPassword = (e) => {
    e
    this.setState({
      password: e
    })
  }

  login = async () => {
    await AsyncStorage.setItem('token', 'TEST');
    console.log('DATALOGIN', this.state.email, this.state.password );
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginForm
          values={{
            email: this.state.email,
            password: this.state.password
          }}
          onChanges={{
            email: this.setEmail,
            password: this.setPassword
          }}
        />
        <Right>
          <Button rounded info onPress={this.login}>
            <Text> Login </Text>
          </Button>
        </Right>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});