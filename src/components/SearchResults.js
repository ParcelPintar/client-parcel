import React from 'react'
import { 
  StyleSheet,
  Dimensions
} from 'react-native'
import { View, List, ListItem, Left, Body, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const {width} = Dimensions.get('window')

const SearchResults = (props) => {
  return (
    <View style={styles.searchResultsWrapper} >
      <List
        dataArray={props.predictions}
        renderRow={(item) =>
          <View>
            <ListItem onPress={() => props.getCoords(item.placeID)} button avatar>
              <Left style={styles.leftContainer}>
                <Icon style={styles.leftIcon} name="map-marker" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchResultsWrapper: {
    top: 160,
    position: "absolute",
    width: width,
    height: 1000,
    backgroundColor: "#fff",
    opacity: 0.9
  },
  primaryText: {
    fontWeight: "bold",
    color: "#373737"
  },
  secondaryText: {
    fontStyle: "italic",
    color: "#7D7D7D",
  },
  leftContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    borderLeftColor: "#7D7D7D",
  },
  leftIcon: {
    fontSize: 20,
    color: "#7D7D7D",
  },
  distance: {
    fontSize: 12,
  }
});

export default SearchResults
