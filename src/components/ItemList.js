import React from 'react'
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

const rpConvert = (number) => {
  return 'Rp ' + number.toLocaleString()
}

const ItemList = (props) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square large source={{uri: props.image}} />
      </Left>
      <Body>
        <Text>{props.name}</Text>
        <Text note numberOfLines={3}>{props.shortDesc}</Text>
        <Text note numberOfLines={1}>Price: {rpConvert(props.price)}</Text>
        {/* <Text note numberOfLines={1}>Stocks left: {props.stock}</Text> */}
      </Body>
      <Right>
        {
          props.disabled ?
          <Button info disabled>
            <Text>Add</Text>
          </Button> :
          <Button info onPress={props.onPress}>
            <Text>Add</Text>
          </Button>
        }
      </Right>
    </ListItem>
  )
}

export default ItemList
