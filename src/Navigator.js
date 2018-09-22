import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Home from './containers/Home'
import AuthLoading from './containers/AuthLoading'
import Other from './containers/Other'
import Welcome from './containers/Welcome'
import Login from './containers/Login'
import Register from './containers/Register'
import Maps from './containers/Maps'

const AppStack = createStackNavigator(
  { 
    Home, 
    Other 
  }
);
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
    Maps
    // AuthLoading,
    // App: AppStack,
    // Auth: AuthStack,
  },
  {
    // initialRouteName: 'AuthLoading',
  }
);