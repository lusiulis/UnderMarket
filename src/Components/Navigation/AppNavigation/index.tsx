import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../Assets/Styles';
import EventView from '../../../Views/Events';
import { AuthContext } from '../../../Contexts/appContentProvider';
import Home from '../../../Views/Home';
import Notifications from '../../../Views/Notifications';
import Post from '../../../Views/Post';
import Profile from '../../../Views/Profile';
import NavigationTab from '../NavigationTab';

const Navbar = createBottomTabNavigator();

const Navigation = () => {
  const {authState} = useContext(AuthContext);
  return (
    <Navbar.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navigator,
      }}
      initialRouteName="Home">
      <Navbar.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <NavigationTab icon="home" focused={focused} value="Home" />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Navbar.Screen
        name="Events"
        component={EventView}
        options={{
          tabBarIcon: ({focused}) => (
            <NavigationTab icon="event" focused={focused} value="Events" />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Navbar.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({focused}) => (
            <NavigationTab icon="add-circle" focused={focused} value="Post" />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Navbar.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => (
            <NavigationTab
              icon="notifications"
              focused={focused}
              value="Notifications"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Navbar.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Profile', {id: authState.profile?.id})
          }
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <NavigationTab icon="profile" focused={focused} value="Profile" />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Navbar.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...CommonStyles.baseShadow,
  },
});

export default Navigation;
