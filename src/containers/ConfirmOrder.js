import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Spinner,
  Thumbnail
} from 'native-base'

import Icon from "react-native-vector-icons/Ionicons";

export default class ConfirmOrder extends Component {
  constructor(){
    super()
    this.state = {
      distance: null,
      ETA: null,
      item: null,
      price: 0,
      loading: false,
      success: null
    }
  }

  static navigationOptions = {
    title: 'Order Detail',
  };
  
  componentDidMount = () => {
    this.setState({
      distance: this.props.navigation.getParam('distance'),
      ETA: this.props.navigation.getParam('ETA'),
      item: this.props.navigation.getParam('item').name,
      price: this.calculatePrice(this.props.navigation.getParam('distance'), this.props.navigation.getParam('item').type)
    })
  }

  convertPrice (price) {
    return 'Rp ' + price.toLocaleString()
  }

  calculatePrice (distance, itemType) {
    console.log('asdfasdf',itemType);
    console.log('disasdfasdf',distance);
    let price = 0
    switch(itemType) {
      case 'l':
        price = Math.round(+distance / 1000) * 5000;
        if(price > 20000){
          console.log(price);
          return price
        }else{
          console.log(price);
          return 20000
        }
        break;
      case 'm':
        price = Math.round(+distance / 1000) * 4000
        if(price > 20000){
          console.log(price);
          return price
        }else{
          console.log(price);
          return 20000
        }
        break;
      default:
        price = Math.round(+distance / 1000) * 3000
        if(price > 20000){
          console.log(price);
          return price
        }else{
          console.log(price);
          return 20000
        }
    }
  }

  render() {
    let button = {};

    let successButton = (
      <Button
        rounded
        success
        style={styles.button}
        onPress={() => {
          this.setState({
            loading: false,
            success: null
          });
        }}
      >
        <Icon name="ios-checkmark-circle-outline" color="white" size={30} />
        <Text>Saved</Text>
      </Button>
    );

    let failedButton = (
      <Button
        rounded
        danger
        style={styles.button}
        onPress={() => {
          this.setState({
            loading: false,
            success: null
          });
        }}
      >
        <Icon name="ios-alert" color="white" size={30} />
        <Text>Failed</Text>
      </Button>
    );

    let submitButton = (
      <Button
        rounded
        info
        style={styles.button}
        onPress={() => {
          this.props.navigation.navigate('OnGoingOrder', {
            destLat: this.props.navigation.getParam('destLat'),
            destLong: this.props.navigation.getParam('destLong')
          })
        }}
      >
        <Text>Confirm Order</Text>
      </Button>
    );

    let loadingButton = (
      <Button
        rounded
        info
        style={styles.button}
        onPress={() => {
          let choose = Math.floor(Math.random() * Math.floor(2));
          if (choose) {
            this.setState({
              loading: false,
              success: true
            });
          } else {
            this.setState({
              loading: false,
              success: false
            });
          }
        }}
      >
        <Spinner color="white" />
        <Text>Loading...</Text>
      </Button>
    );

    if (!this.state.loading && this.state.success === null) {
      button = submitButton;
    } else if (this.state.success && !this.state.loading) {
      button = successButton;
    } else if (this.state.success === false && !this.state.loading) {
      button = failedButton;
    } else if (this.state.loading) {
      button = loadingButton;
    }

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.editTitle}>
            <Image
              style={{ width: 120, height: 120 }}
              source={require(`../public/img/gift.png`)}
            />
          </View>
          <View style={styles.form}>
            <Form>
              <Item stackedLabel disabled>
                <Label>Chosen Package</Label>
                <Input 
                  disabled 
                  value={this.state.item}
                />
              </Item>
              <Item stackedLabel disabled>
                <Label>Estimated Time Arrived</Label>
                <Input 
                  disabled 
                  value={this.state.ETA}
                />
              </Item>
              <Item stackedLabel disabled>
                <Label>Price</Label>
                <Input 
                  disabled 
                  value={this.convertPrice(this.state.price)}
                />
              </Item>
            </Form>
          </View>
          <View style={styles.confirmButton}>{submitButton}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get("window").height*0.87
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bfe4ff",
    flex: 1
  },
  editTitle: {
    justifyContent: "center",
    flex: 1
  },
  form: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "90%",
    flex: 1,
    alignSelf: "center"
  }
});