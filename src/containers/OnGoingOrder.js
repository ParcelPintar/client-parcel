import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Text, 
  Button,
  Thumbnail
} from 'native-base'
import MapView from 'react-native-maps'
const polyline = require('@mapbox/polyline');
import axios from 'axios'

const API_KEY = 'AIzaSyBn1H1x86gDfxe9XutNmhdnafkLsdnhedI'
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.1753924;
const LONGITUDE = 106.8249641;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class OnGoingOrder extends Component {
  constructor(){
    super()
    this.state = {
      initialRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      latitude: null,
      longitude: null,
      error: null,
      coords: [],
    }
  }
  static navigationOptions = {
    title: 'OnGoingOrder',
  };

  getDirections = (start, destination) => {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${ start }&destination=${ destination }&key=${ API_KEY }`)
      .then(({data}) => {
        let points = polyline.decode(data.routes[0].overview_polyline.points)
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        })
        this.setState({coords})
        console.log(coords)
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
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
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.82,
    width: width,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  middleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center'
  }
 });