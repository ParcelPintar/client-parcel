import React from 'react'
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

// const rpConvert = (number) => {
//   return 'Rp ' + number.toLocaleString()
// }

const ItemList = (props) => {
  return (
    <ListItem thumbnail style={{marginTop: 15}}>
      <Left>
        <Thumbnail square large source={{uri: props.image}} />
      </Left>
      <Body>
        <Text>{props.name}</Text>
        <Text note numberOfLines={1}>{props.size}</Text>
        {/* <Text note numberOfLines={1}>Price: {rpConvert(props.price)}</Text> */}
        {/* <Text note numberOfLines={1}>Stocks left: {props.stock}</Text> */}
      </Body>
      <Right>
        {
          props.disabled ?
          <Button info disabled>
            <Text>Add</Text>
          </Button> :
          <Button info onPress={props.onPress}>
            <Text>Select</Text>
          </Button>
        }
      </Right>
    </ListItem>
  )
}

export default ItemList
