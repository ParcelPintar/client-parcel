import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
  Dimensions,
  PermissionsAndroid
} from 'react-native'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

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
      locationCoordinates: {
        latitude: -6.2607187,
        longitude: 106.7794222,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }

  // const latDelta = Number(response.data.results[0].geometry.viewport.northeast.lat) - Number(response.data.results[0].geometry.viewport.southwest.lat)
  // const lngDelta = Number(response.data.results[0].geometry.viewport.northeast.lng) - Number(response.data.results[0].geometry.viewport.southwest.lng)

  componentDidMount = () => {
    console.log('MAPS');
    console.log(width, height);
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
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
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

  onRegionChange = (region) => {
    this.setState({region})
  }
  

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.container}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          <Marker
            coordinate={this.state.region}
          />
        </MapView>


      </View>


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