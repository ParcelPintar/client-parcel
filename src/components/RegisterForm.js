import React, { Component, Fragment } from 'react';
import { Form, Item, Input, Label } from 'native-base';
// import { TextInput, Text } from 'react-native'

export default class RegisterForm extends Component {
  
  render() {
    return (
      <Form>
        <Item stackedLabel>
          <Label>Name</Label>
          <Input
            value={this.props.values.name}
            onChangeText={this.props.onChanges.name}
            required
          />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input
            value={this.props.values.email}
            onChangeText={this.props.onChanges.email}
            required
          />
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={this.props.values.password}
            onChangeText={this.props.onChanges.password}
            required
          />
        </Item>
      </Form>
    );
  }
}