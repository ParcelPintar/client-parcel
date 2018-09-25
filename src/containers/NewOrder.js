import React, { Component } from 'react'
import { 
  StyleSheet,
  FlatList
} from 'react-native'
import {
  List,
  Container,
  Content,
  Header,
  Body,
  Title,
  Right,
  Button,
  Text
} from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ItemList from '../components/ItemList'

export default class NewOrder extends Component {
  constructor(){
    super()
    this.state = {
      items: [
        {
          name: 'Small Parcel Pintar',
          image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
          size: '15 cm x 15 cm x 15 cm',
          type: 's'
        },
        {
          name: 'Medium Parcel Pintar',
          image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
          size: '30 cm x 30 cm x 30 cm',
          type: 'm'
        },
        {
          name: 'Large Parcel Pintar',
          image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
          size: '50 cm x 50 cm x 50 cm',
          type: 'l'
        },
      ],
    }
  }
  static navigationOptions = {
    title: 'Select your Parcel Pintar'
  };

  proceed = (item) => {
    this.props.navigation.navigate('Maps', {item})
  }

  render() {
    return (
      <Container>
        {/* <Header style={{backgroundColor: '#44b4ff'}}>
          <Body>
            <Title>  Select your Parcel Pintar</Title>
          </Body>
          <Right>
            <Button small transparent onPress={() => this.props.navigation.navigate('Checkout', {cart: this.state.cart})}>
              <FontAwesome5 name={'shopping-cart'} color='white' size={25} solid />
              <Text>{this.state.total} </Text>
            </Button>
          </Right>
        </Header> */}
        <Content padder>
          <List>
            <FlatList
              data={this.state.items}
              renderItem={({ item, index }) => (
                <ItemList
                  name={item.name}
                  image={item.image}
                  size={item.size}
                  // stock={item.stock}
                  // shortDesc={item.shortDesc}
                  onPress={() => this.proceed(item)}
                />
              )}
            />
          </List>
        </Content>
      </Container>
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