import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "native-base";

import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  mainRow: {
    flex: 1,
    height: "100%",
    backgroundColor:"white"
  },
  profilePic: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  dataProfile: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  dataProfileBox: {
    width: "95%",
    height: "90%",
    backgroundColor: "#44b4ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonEdit: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  profile: {
    fontSize: 20,
    marginLeft: 10,
    color: "white"
  },
  iconWithProfile: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    return (
      <View style={styles.mainRow}>
        <View style={styles.profilePic}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{
              uri:
                "http://www.myiconfinder.com/uploads/iconsets/ac7256a56da1fa7c09a699ddec407e7e-human.png"
            }}
          />
        </View>
        <View style={styles.dataProfile}>
          <View style={styles.dataProfileBox}>
            <Text style={styles.profile}>Erithiana Sisijoan Koesnadi</Text>
            <View style={styles.iconWithProfile}>
              <Icon name="ios-mail" color="white" size={30} />
              <Text style={styles.profile}>joanlamrack@gmail.com</Text>
            </View>
            <View style={styles.iconWithProfile}>
              <Icon name="ios-call" color={"white"} size={30} />
              <Text style={styles.profile}>+6285311906281</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonEdit}>
          <Button
            rounded
            info
            large
            style={{ width: "90%", flex: 1, alignSelf: "center" }}
            onPress={() => {
              this.props.navigation.navigate("EditProfile");
            }}
          >
            <Icon name="ios-create" color="white" size={30} />
            <Text>Edit</Text>
          </Button>
        </View>
      </View>
    );
  }
}
