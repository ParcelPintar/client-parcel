import React from 'react'
import { 
  StyleSheet,
  Dimensions
} from 'react-native'
import { View, InputGroup, Input, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const {width} = Dimensions.get('window')


const SearchBox = () => {
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
      <Text style={styles.label}>PICK-UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            // onFocus={() => toggleSearchResultModal("pickUp")}
            style={styles.inputSearch}
            placeholder="Choose pick-up location"
            // onChangeText={handleInput.bind(this, "pickUp")}
            // value={selectedPickUp && selectedPickUp.name}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DESTINATION</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            // onFocus={() => toggleSearchResultModal("dropOff")}
            style={styles.inputSearch}
            placeholder="Choose destination location"
            // onChangeText={handleInput.bind(this, "dropOff")}
            // value={selectedDropOff && selectedDropOff.name}
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
      opacity:0.9,
      borderRadius:7
  },
  secondInputWrapper:{
      marginLeft:15,
      marginRight:10,
      marginTop:0,
      backgroundColor:"#fff",
      opacity:0.9,
      borderRadius:7
  },
  inputSearch:{
      fontSize:14
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
