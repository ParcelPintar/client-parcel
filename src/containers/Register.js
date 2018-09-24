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

import RegisterForm from '../components/RegisterForm'

export default class Register extends Component {
  constructor (){
    super ()
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  static navigationOptions = {
    title: 'Register',
  };

  setName = (e) => {
    e
    this.setState({
      name: e
    })
  }

  setEmail = (e) => {
    e
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

  register = async () => {
    await AsyncStorage.setItem('token', 'TEST');
    console.log('DATAREG', this.state.email, this.state.password, this.state.name );
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <RegisterForm
          values={{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }}
          onChanges={{
            name: this.setName,
            email: this.setEmail,
            password: this.setPassword
          }}
        />
        <Right>
          <Button rounded info onPress={this.register}>
            <Text> Register </Text>
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