import React from 'react'
import { 
  StyleSheet,
  Dimensions
} from 'react-native'
import { View, InputGroup, Input, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const {width} = Dimensions.get('window')


const SearchBox = (props) => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
      <Text style={styles.label}>PICK-UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            onFocus={() => props.onFocus('pickUp')}
            style={styles.inputSearch}
            placeholder="Choose pick-up location"
            onChangeText={props.onChanges.pickup}
            value={props.selectedPickUp.name && props.selectedPickUp.name}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DESTINATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            onFocus={() => props.onFocus('destination')}
            style={styles.inputSearch}
            placeholder="Choose destination location"
            onChangeText={props.onChanges.destination}
            value={props.selectedDestination.name && props.selectedDestination.name}
          />
        </InputGroup>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBox:{
      top:0,
      position:"absolute",
      width:width
  },
  inputWrapper:{
      marginLeft:15,
      marginRight:10,
      marginTop:10,
      marginBottom:0,
      backgroundColor:"#fff",
      opacity:0.7,
      borderRadius:7
  },
  secondInputWrapper:{
      marginLeft:15,
      marginRight:10,
      marginTop:0,
      backgroundColor:"#fff",
      opacity:0.7,
      borderRadius:7
  },
  inputSearch:{
      fontSize:12
  },
  label:{
      fontSize:10,
      fontStyle: "italic",
      marginLeft:10,
      marginTop:10,
      marginBottom:0
  }
});

export default SearchBox
