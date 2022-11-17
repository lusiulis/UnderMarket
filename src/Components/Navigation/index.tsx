import React from 'react';
import LogIn from '../../Views/Auth/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../Views/Auth/SignIn';
import AppNavigation from './AppNavigation';
import ProfileShop from '../../Views/Shop/ProfileShop';
import CreateShop from '../../Views/Shop/CreateShop';
import ShopsList from '../../Views/Shop/ShopList';

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
      <Stack.Screen name="ProfileShop" component={ProfileShop} />
      <Stack.Screen name="NewShop" component={CreateShop} />
      <Stack.Screen name="ShopsList" component={ShopsList} />


    </Stack.Navigator>
  );
};

export default Navigation;
