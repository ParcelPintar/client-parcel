import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
} from 'react-native'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

export default class Maps extends Component {
  constructor(){
    super()
    this.state = {
      locationCoordinates: {
        latitude: -6.2,
        longitude: 106.4,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
    }
  }

  // const latDelta = Number(response.data.results[0].geometry.viewport.northeast.lat) - Number(response.data.results[0].geometry.viewport.southwest.lat)
  // const lngDelta = Number(response.data.results[0].geometry.viewport.northeast.lng) - Number(response.data.results[0].geometry.viewport.southwest.lng)

  render() {
    return (
      <View>
      <MapView
        style={styles.container}
        region={this.state.locationCoordinates}
        zoomEnabled={true}
        scrollEnabled={true}
      />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
