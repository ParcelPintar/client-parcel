import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Spinner
} from "native-base";

import Icon from "react-native-vector-icons/Ionicons";

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

export default class EditProfile extends Component {
  static navigationOptions = {
    title: "Edit Profile"
  };

  constructor() {
    super();
    this.state = {
      name: "Suuusi",
      email: "sushi@parcelpintar.com",
      phone: "+62853119062",
      loading: false,
      success: null
    };
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
          this.setState({
            loading: true
          });
        }}
      >
        <Icon name="ios-person" color="white" size={30} />
        <Text>Submit</Text>
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
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.editTitle}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri:
                    "http://www.myiconfinder.com/uploads/iconsets/ac7256a56da1fa7c09a699ddec407e7e-human.png"
                }}
              />
            </View>
            <View style={styles.form}>
              <Form>
                <Item stackedLabel>
                  <Label>Name</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Phone</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </View>
            <View style={styles.confirmButton}>{button}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}