import React from 'react';
import LogIn from '../../../Views/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../../Views/Home';

const AuthNavigator = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
