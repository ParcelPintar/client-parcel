import React, { Component } from 'react';
import { Form, Item, Input, Label } from 'native-base';

export default class AuthForm extends Component {
  render() {
    return (
      <Form>
        {
          this.props.values.name && (
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
                type="text"
                value={this.props.values.name}
                onChange={this.props.onChanges.name}
                required
              />
            </Item>
          )
        }
        <Item stackedLabel>
          <Label>Email</Label>
          <Input
            type="email"
            value={this.props.values.email}
            onChange={this.props.onChanges.email}
            required
          />
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input
            type="password"
            value={this.props.values.password}
            onChange={this.props.onChanges.password}
            required
          />
        </Item>
      </Form>
    );
  }
}