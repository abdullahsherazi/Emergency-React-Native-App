import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import DataEntryScreen from './DataEntryScreen';
import Profile from './Profile';
import EditProfile from './EditProfile';
import MakeProfile from './MakeProfile';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    DataEntryScreen: {
      screen: DataEntryScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    MakeProfile: {
      screen: MakeProfile,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
