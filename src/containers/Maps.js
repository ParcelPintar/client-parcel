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
      },
      pickupQ: '',
      destinationQ: ''
    }
  }
  static navigationOptions = {
    title: 'Select Your Location',
  };

  componentDidMount = () => {
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
    { enableHighAccuracy: true, timeout: 20000 },
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
        pickupQ: '',
        selectedPickup:{
          ...this.state.selectedPickup,
          name: null
        }
      })
    } else {
      this.setState({
        searchPickup: false,
        destinationQ: '',
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
        pickups: null,
        selectedPickup:{
          ...this.state.selectedPickup,
          name: null
        }
      })
    } else {
      this.setState({pickupQ: e})
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
        destinations: null,
        selectedDestination:{
          ...this.state.selectedDestination,
          name: null
        }
      }) 
    } else {
      this.setState({destinationQ: e})
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

  getDistanceByCoords = () => {
    let baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    // let origins = `origins=place_id:${this.state.selectedPickup.placeId}`
    // let destinations = `destinations=place_id:${this.state.selectedDestination.placeId}`
    let origins = `origins=${this.state.selectedPickup.lat},${this.state.selectedPickup.long}`
    let destinations = `destinations=${this.state.selectedDestination.lat},${this.state.selectedDestination.long}`
    let params = `${origins}&${destinations}&key=${API_KEY}`
    
    axios.get(baseUrl + params)
      .then(({data}) => {
        console.log(data.rows[0].elements[0])
        this.checkout(data.rows[0].elements[0])
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkout = (calculation) => {
    let distance = calculation.distance.value
    let duration = calculation.duration.text
    let item = this.props.navigation.getParam('item')
    this.props.navigation.navigate('ConfirmOrder', {
      distance, 
      ETA: duration, 
      item, 
      destLat: this.state.selectedDestination.lat, 
      destLong: this.state.selectedDestination.long,
      pickLat: this.state.selectedPickup.lat,
      pickLong: this.state.selectedPickup.long
    })
  }

  setPickupByMarker = () => {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    let lat = this.state.region.latitude
    let long = this.state.region.longitude
    let location = `location=${lat},${long}`
    let radius = `radius=500`

    axios.get(`${baseUrl}${location}&${radius}&key=${API_KEY}`)
      .then(({data}) => {
        this.getCoordsPickup(data.results[1].place_id)
        console.log(data.results[1].name);
      })
      .catch(err => {
        console.log(err)
      })
  }

  setDestinationByMarker = () => {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    let lat = this.state.region.latitude
    let long = this.state.region.longitude
    let location = `location=${lat},${long}`
    let radius = `radius=1000`

    axios.get(`${baseUrl}${location}&${radius}&key=${API_KEY}`)
      .then(({data}) => {
        this.getCoordsDestination(data.results[1].place_id)
        console.log(data.results[1].name);
      })
      .catch(err => {
        console.log(err)
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
            pinColor='red'
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
        {
          (this.state.selectedDestination.name && this.state.selectedPickup.name) &&
          <View style={styles.bottomButton}>
            <Button rounded info style={{marginBottom: 30}}
              onPress={this.getDistanceByCoords}
            >
              <Text> ORDER </Text>
            </Button>
          </View>
        }
        {
          !this.state.selectedPickup.name && !this.state.searchPickup &&
          <View style={styles.middleButton}>
            <Button rounded small info style={{ marginTop: 40 }}
              onPress={this.setPickupByMarker}
            >
              <Text> SET PICK-UP HERE </Text>
            </Button>
          </View>
        }
        {
          (!this.state.selectedDestination.name && this.state.destinationQ.length <=0 && this.state.selectedPickup.name) &&
          <View style={styles.middleButton}>
            <Button rounded small info style={{ marginTop: 40 }}
              onPress={this.setDestinationByMarker}
            >
              <Text> SET DESTINATION HERE </Text>
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