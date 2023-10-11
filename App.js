

//this is for install navigation in react 
//================First: npm install react-navigation-stack -g=================>
//================Second: npm install react-navigation-gesture-handler -g===========>


import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Provider as AuthProvider  } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} />
};

const Tab = createBottomTabNavigator();

// create bottom tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen name='TrackList' component={TrackListScreen}/>
        <Tab.Screen name='TrackDetail' component={TrackDetailScreen} />
      </Tab.Group>
       <Tab.Screen name="TrackCreateScreen" component={TrackCreateScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
const trackdetail = createStackNavigator({
  TrackDetail:TrackDetailScreen,
})

const SwitchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  main:MainTabNavigator,
  last:trackdetail,
});


const App = createAppContainer(SwitchNavigator);

export default () => {
  return (
    <NavigationContainer>
     <TrackProvider>
     <LocationProvider>
      <AuthProvider>
        <App
        ref={navigator => {
          setNavigator(navigator);
        }} 
        />
      </AuthProvider>
      </LocationProvider>
     </TrackProvider>
    </NavigationContainer>
  );
};