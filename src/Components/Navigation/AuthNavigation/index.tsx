import React from 'react';
import LogIn from '../../../Views/Auth/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../../Views/Auth/SignIn';
import Navigation from '..';

const AuthNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='LogIn' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='AppNavigation' component={Navigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
