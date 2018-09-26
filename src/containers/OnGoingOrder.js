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
  Content,
  Header,
  Body,
  Title,
  Right,
  Text, 
  Button,
  Thumbnail
} from 'native-base'
import MapView, { Marker, Polyline } from 'react-native-maps'
const polyline = require('@mapbox/polyline');
import axios from 'axios'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      // latitude: null,
      // longitude: null,
      coords: [],
      thereIsRoute: null,
      destLatitude: -6.2607187,
      destLongitude: 106.7794275,
      // pickLatitude: -6.2807187,
      // pickLongitude: 106.7894275
    }
  }

  static navigationOptions = {
    title: 'OnGoingOrder',
  };

  componentDidMount = () => {
    console.log('OOG',
    this.props.navigation.getParam('pickLat')
  );
    this.setState({
      region: {
        latitude: this.props.navigation.getParam('pickLat'),
        longitude: this.props.navigation.getParam('pickLong'),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      // destLatitude: this.props.navigation.getParam('destLat'),
      // destLongitude: this.props.navigation.getParam('destLong'),
      destLatitude: this.props.navigation.getParam('destLat'),
      destLongitude: this.props.navigation.getParam('destLong')
    }, 
      this.startDrawLine()
    )

    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     console.log('POS', position);
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //     this.startDrawLine()
    //   },
    // (error) => console.log(error.message),
    // { enableHighAccuracy: true, timeout: 20000 },
    // );
  }

  startDrawLine = () => {
    // if (this.state.region.latitude != null && this.state.region.longitude != null) {
    //   let locationNow = `${this.state.region.latitude},${this.state.region.longitude}`
      
    //   this.getDirections(locationNow, `${this.state.destLatitude},${this.state.destLongitude}`);
    // }

    let locationNow = `${this.props.navigation.getParam('pickLat')},${this.props.navigation.getParam('pickLong')}`
    
    this.getDirections(locationNow, `${this.props.navigation.getParam('destLat')},${this.props.navigation.getParam('destLong')}`);
  }

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
        this.setState({thereIsRoute: true})
        console.log(coords)
      })
      .catch(err => {
        this.setState({thereIsRoute: 'error'})
        console.log(err);
      })
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <MapView
      //     style={styles.map}
      //     showsUserLocation={true}
      //     region={this.state.region}
      //   >
      //     {
      //       (this.state.region.latitude && this.state.region.longitude) &&
      //       <Marker
      //         coordinate={this.state.region}
      //         title='Your Location'
      //         pinColor='blue'
      //       />
      //     }
      //     {
      //       (this.state.destLatitude && this.state.destLongitude) &&
      //       <Marker
      //         coordinate={{
      //           latitude: this.state.destLatitude,
      //           longitude: this.state.destLongitude
      //         }}
      //         title='Your Parcel'
      //         pinColor='red'
      //       />
      //     }
      //     {
      //       (this.state.region.latitude && this.state.region.longitude && this.state.thereIsRoute) &&
      //       <Polyline
      //         coordinates={this.state.coords}
      //         strokeWidth={5}
      //         strokeColor="blue"
      //       />
      //     }
      //     {
      //       (this.state.region.latitude && this.state.region.longitude && this.state.thereIsRoute == 'error') &&
      //       <Polyline
      //         coordinates={[
      //           {
      //             latitude: this.state.region.latitude,
      //             longitude: this.state.region.longitude
      //           },
      //           {
      //             latitude: this.state.destLatitude,
      //             longitude: this.state.destLongitude
      //           }
      //         ]}
      //         strokeWidth={5}
      //         strokeColor="blue"
      //       />
      //     }
      //   </MapView>  
      // </View>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
        >
          {
            (this.state.region.latitude && this.state.region.longitude) &&
            <Marker
              coordinate={this.state.region}
              title='Your Location'
              pinColor='blue'
            />
          }
          {
            (this.state.destLatitude && this.state.destLongitude) &&
            <Marker
              coordinate={{
                latitude: this.state.destLatitude,
                longitude: this.state.destLongitude
              }}
              title='Your Parcel'
              pinColor='red'
            />
          }
          {
            (this.state.region.latitude && this.state.region.longitude && this.state.thereIsRoute) &&
            <Polyline
              coordinates={this.state.coords}
              strokeWidth={5}
              strokeColor="blue"
            />
          }
          {
            (this.state.region.latitude && this.state.region.longitude && this.state.thereIsRoute == 'error') &&
            <Polyline
              coordinates={[
                {
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude
                },
                {
                  latitude: this.state.destLatitude,
                  longitude: this.state.destLongitude
                }
              ]}
              strokeWidth={5}
              strokeColor="blue"
            />
          }
          
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
 });