import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class AuthForm extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            {
              this.props.name && (
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input 
                    type="text"
                    value={this.props.name}
                    onChange={this.props.onChanges.name}
                    required
                  />
                </Item>
              )
            }
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                type="email"
                value={this.props.email}
                onChange={this.props.onChanges.email}
                required
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                type="password"
                value={this.props.password}
                onChange={this.props.onChanges.password}
                required
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}