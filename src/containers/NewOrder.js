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
  Button ,
  Text
} from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ItemList from '../components/ItemList'

const items = [
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    // stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  },
  {
    name: 'test',
    image: 'https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552',
    price: 50000,
    stock: 5,
    shortDesc: 'Perfect for your loved one'
  }
]

export default class NewOrder extends Component {
  constructor(){
    super()
    this.state = {
      cart: [],
      total: 0
    }
  }
  static navigationOptions = {
    header: null
  };

  addToCart = (item) => {
    this.setState({
      total: this.state.total + 1,
      cart: [...this.state.cart, item]
    })
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#44b4ff'}}>
          <Body>
            <Title>  Parcel Pintar</Title>
          </Body>
          <Right>
            <Button small transparent onPress={() => this.props.navigation.navigate('Checkout', {cart: this.state.cart})}>
              <FontAwesome5 name={'shopping-cart'} color='white' size={25} solid />
              <Text>{this.state.total} </Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <FlatList
              data={items}
              renderItem={({ item, index }) => (
                <ItemList
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  stock={item.stock}
                  shortDesc={item.shortDesc}
                  onPress={() => this.addToCart(item)}
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