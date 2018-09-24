import React from 'react'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-vector-icons/FontAwesome";

import NewOrder from './containers/NewOrder'
import Maps from './containers/Maps'
import ConfirmOrder from './containers/ConfirmOrder'
import OnGoingOrder from './containers/OnGoingOrder'
import OrderHistory from './containers/OrderHistory'
import OrderDetail from './containers/OrderDetail'
import Profile from './containers/Profile'
import EditProfile from './containers/EditProfile'

import AuthLoading from './containers/AuthLoading'
import Welcome from './containers/Welcome'
import Login from './containers/Login'
import Register from './containers/Register'

const OrderStack = createStackNavigator(
  { 
    // NewOrder, 
    Maps,
    ConfirmOrder 
  },
  {
    initialRouteName: 'Maps'
  }
)

const HistoryStack = createStackNavigator (
  {
    OnGoingOrder,
    OrderHistory,
    OrderDetail
  },
  {
    initialRouteName: 'OnGoingOrder'
  }
)

const SettingsStack = createStackNavigator (
  {
    Profile,
    EditProfile,
  },
  {
    initialRouteName: 'Profile'
  }
)

const AppBotTab = createBottomTabNavigator (
  {
    'New Order': OrderStack,
    Orders: HistoryStack,
    Profile: SettingsStack
  },
  {
    initialRouteName: 'New Order',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'New Order') {
          return (<FontAwesome5 name={'box'} size={25} solid />)
        } else if (routeName === 'Orders') {
          return (<Icon name="list-alt" size={25}></Icon>)
        } else {
          return (<FontAwesome5 name={'user-alt'} size={25} brand />)
        }
      },
    }),
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'black',
    },
  } 
)

const AuthStack = createStackNavigator(
  {  
    Welcome,
    Login,
    Register
  },
  {
    initialRouteName: 'Welcome'
  }
);

export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppBotTab,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);