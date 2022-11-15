import React from 'react';
import LogIn from '../../Views/Auth/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../Views/Auth/SignIn';
import AppNavigation from './AppNavigation';

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AppNavigation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="AppNavigation" component={AppNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
