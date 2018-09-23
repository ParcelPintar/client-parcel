import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
  Dimensions,
  PermissionsAndroid
} from 'react-native'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import SearchBox from '../components/SearchBox'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.1753924;
const LONGITUDE = 106.8249641;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends Component {
  constructor(){
    super()
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }
  static navigationOptions = {
    title: 'Pickup Location',
  };

  // const latDelta = Number(response.data.results[0].geometry.viewport.northeast.lat) - Number(response.data.results[0].geometry.viewport.southwest.lat)
  // const lngDelta = Number(response.data.results[0].geometry.viewport.northeast.lng) - Number(response.data.results[0].geometry.viewport.southwest.lng)

  componentDidMount = () => {
    console.log('MAPS');
    this.requestLocPermission()

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );    
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  requestLocPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'ParcelPintar App Permission',
          'message': 'ParcelPintar App needs access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the APP")
      } else {
        console.log("APP permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  setRegion = (e) => {
    console.log(e.nativeEvent.coordinate);
    this.setState({
      region: {
        ... this.state.region,
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          // onRegionChange={this.onRegionChange}
          onRegionChangeComplete={(region) => {
            this.setState({region})
          }}
          onLongPress={this.setRegion}
        >
          <Marker
            coordinate={this.state.region}
            pinColor='blue'
            onMarkerDragEnd={(e)=> console.log(e)}
            onDragEnd={this.setRegion}
            draggable
          />
        </MapView>
        <SearchBox />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });