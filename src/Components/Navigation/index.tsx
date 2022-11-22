import React from 'react';
import LogIn from '../../Views/Auth/LogIn';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../Views/Auth/SignIn';
import AppNavigation from './AppNavigation';
import CreateShop from '../../Views/Shop/CreateShop';
import ShopsList from '../../Views/Shop/ShopList';
import ShopProfile from '../../Views/Shop';
import CreateEvent from '../../Views/Events/CreateEvent';
import WishList from '../../Views/WishLists';

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
      <Stack.Screen name="NewEvent" component={CreateEvent} />
      <Stack.Screen name="ShopsList" component={ShopsList} />
      <Stack.Screen name="Shop" component={ShopProfile} />
      <Stack.Screen name="WishList" component={WishList} />
    </Stack.Navigator>
  );
};

export default Navigation;
