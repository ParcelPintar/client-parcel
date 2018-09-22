import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
  Dimensions,
} from 'react-native'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Maps extends Component {
  constructor(){
    super()
    this.state = {
      locationCoordinates: {
        latitude: -6.2,
        longitude: 106.4,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },

      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    }
  }

  // const latDelta = Number(response.data.results[0].geometry.viewport.northeast.lat) - Number(response.data.results[0].geometry.viewport.southwest.lat)
  // const lngDelta = Number(response.data.results[0].geometry.viewport.northeast.lng) - Number(response.data.results[0].geometry.viewport.southwest.lng)

  render() {
    return (
      <MapView
        style={styles.container}
        region={this.state.locationCoordinates}
        zoomEnabled={true}
        scrollEnabled={true}
      />
      // <View style={styles.container}>
      //   <MapView
      //     provider={this.props.provider}
      //     style={styles.map}
      //     initialRegion={{
      //       latitude: LATITUDE,
      //       longitude: LONGITUDE,
      //       latitudeDelta: LATITUDE_DELTA,
      //       longitudeDelta: LONGITUDE_DELTA,
      //     }}
      //   >
      //     <Marker
      //       coordinate={this.state.a}
      //       onSelect={(e) => log('onSelect', e)}
      //       onDrag={(e) => log('onDrag', e)}
      //       onDragStart={(e) => log('onDragStart', e)}
      //       onDragEnd={(e) => log('onDragEnd', e)}
      //       onPress={(e) => log('onPress', e)}
      //       draggable
      //     >
      //     </Marker>
      //     <Marker
      //       coordinate={this.state.b}
      //       onSelect={(e) => log('onSelect', e)}
      //       onDrag={(e) => log('onDrag', e)}
      //       onDragStart={(e) => log('onDragStart', e)}
      //       onDragEnd={(e) => log('onDragEnd', e)}
      //       onPress={(e) => log('onPress', e)}
      //       draggable
      //     />
      //   </MapView>
      // </View>
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
