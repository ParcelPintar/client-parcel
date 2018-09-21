import React, { Component } from 'react'
import { 
  Container,
  Content,
  Button,
  Text,
  Right
} from 'native-base'
import { 
  StyleSheet, 
  View,
  AsyncStorage
} from 'react-native'

import AuthForm from '../components/AuthForm'

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
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  setPassword = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    })
  }

  login = async () => {
    await AsyncStorage.setItem('token', 'TEST');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <AuthForm
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