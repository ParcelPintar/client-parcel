import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Home from './containers/Home'
import AuthLoading from './containers/AuthLoading'
import Other from './containers/Other'
import Login from './containers/Login'
import Welcome from './containers/Welcome'

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
    // Register
  }
);

export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);