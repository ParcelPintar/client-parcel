import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
  Dimensions,
  PermissionsAndroid,
  
} from 'react-native'
import {Button, Text} from 'native-base'
import MapView, { Marker } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places'
import axios from 'axios'

import SearchBox from '../components/SearchBox'
import SearchResults from '../components/SearchResults';

const API_KEY = 'AIzaSyBn1H1x86gDfxe9XutNmhdnafkLsdnhedI'
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
      },
      searchPickup: false,
      pickups: null,
      destinations: null,
      selectedPickup: {
        placeId: null,
        name: null,
        lat: null,
        long: null
      },
      selectedDestination: {
        placeId: null,
        name: null,
        lat: null,
        long: null
      }
    }
  }
  static navigationOptions = {
    title: 'Pickup Location',
  };

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
    // this.watchID = navigator.geolocation.watchPosition(
    //   position => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   }
    // );    
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }

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
    this.setState({
      region: {
        ... this.state.region,
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      }
    })
  }

  togglerSearch = (type) => {
    if (type == 'pickUp') {
      this.setState({
        searchPickup: true,
        selectedPickup:{
          ...this.state.selectedPickup,
          name: null
        }
      })
    } else {
      this.setState({
        searchPickup: false,
        selectedDestination:{
          ...this.state.selectedDestination,
          name: null
        }
      })
    }
  }

  predictPickup = (e) => {
    if (!e.length){
      this.setState({
        searchPickup: true,
        pickups: null
      })
    } else {
      RNGooglePlaces.getAutocompletePredictions(e, {country: 'ID'})
      .then((results) => {
        this.setState({pickups:results})
      })
      .catch((error) => console.log(error.message));
    }
  }

  predictDestination = (e) => {
    if (!e.length){
      this.setState({
        searchPickup: false,
        destinations: null
      }) 
    } else {
      RNGooglePlaces.getAutocompletePredictions(e, {country: 'ID'})
      .then((results) => this.setState({destinations:results}))
      .catch((error) => console.log(error.message));
    }
  }

  getCoordsPickup = (placeId) => {
    console.log('coordP');
    this.setState({
      searchPickup: true,
      pickups: null
    })

    RNGooglePlaces.lookUpPlaceByID(placeId)
      .then((results) => {
        this.setState({
          selectedPickup: {
            placeId,
            name: results.name,
            lat: results.latitude,
            long: results.longitude
          }
        })
      })
      .catch((error) => console.log(error.message));
  }

  getCoordsDestination = (placeId) => {
    console.log('coordD');
    this.setState({
      searchPickup: false,
      destinations: null
    }) 

    RNGooglePlaces.lookUpPlaceByID(placeId)
      .then((results) => {
        this.setState({
          selectedDestination: {
            placeId,
            name: results.name,
            lat: results.latitude,
            long: results.longitude
          }
        })
      })
      .catch((error) => console.log(error.message));
  }

  getDistanceByPlaceId = () => {
    let baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    let origins = `origins=place_id:${this.state.selectedPickup.placeId}`
    let destinations = `destinations=place_id:${this.state.selectedDestination.placeId}`
    let params = `${origins}&${destinations}&key=${API_KEY}`
    axios.get(baseUrl + params)
      .then(({data}) => {
        console.log(data.rows[0].elements[0])
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
        <SearchBox 
          onChanges={{
            pickup: this.predictPickup,
            destination: this.predictDestination
          }}
          onFocus={this.togglerSearch}
          selectedDestination={this.state.selectedDestination}
          selectedPickUp={this.state.selectedPickup}
        />
        {
          (this.state.searchPickup && this.state.pickups) && 
          <SearchResults predictions={this.state.pickups} getCoords={this.getCoordsPickup}
          />
        }
        {
          (!this.state.searchPickup && this.state.destinations) && 
          <SearchResults predictions={this.state.destinations} getCoords={this.getCoordsDestination}
          />
        }
        <View style={styles.middleButton}>
          <Text style={{marginTop: 95}}>SET HERE</Text>
        </View>
        {
          (this.state.selectedDestination.name && this.state.selectedPickup.name) &&
          <View style={styles.bottomButton}>
            <Button rounded info style={{marginBottom: 30}}
              onPress={this.getDistanceByPlaceId}
            >
              <Text> ORDER </Text>
            </Button>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.97,
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