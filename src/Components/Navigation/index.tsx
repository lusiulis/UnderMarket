import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native";
import { create } from "react-test-renderer";
import { CommonSyles } from "../../Assets/Styles";

import Home from "../../Views/Home";
import Notifications from "../../Views/Notifications";
import Post from "../../Views/Post";
import Profile from "../../Views/Profile";
import Search from "../../Views/Search";
import NavigationTab from "./NavigationTab";

const Navbar = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Navbar.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.navigator
    }}
    initialRouteName="Home">
      <Navbar.Screen name="Home" component={Home} options={{
        tabBarIcon: ({focused, color,  size}) => (
          <NavigationTab focused={focused} value="Home" />
        ),
        tabBarShowLabel: false
      }} />
      <Navbar.Screen name="Search" component={Search} options={{
        tabBarIcon: ({focused}) => (
          <NavigationTab focused={focused} value="Search" />
        ),
        tabBarShowLabel: false
      }} />
      <Navbar.Screen name="Post" component={Post} options={{
         tabBarIcon: ({focused}) => (
          <NavigationTab focused={focused} value="Post" />
        ),
        tabBarShowLabel: false
      }} />
      <Navbar.Screen name="Notifications" component={Notifications} options={{
        tabBarIcon: ({focused}) => (
          <NavigationTab focused={focused} value="Notifications" />
        ),
        tabBarShowLabel: false
      }} />
      <Navbar.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused}) => (
          <NavigationTab focused={focused} value="Profile" />
        ),
        tabBarShowLabel: false
      }} />
    </Navbar.Navigator>
  )
}

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 70,
    borderColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    ...CommonSyles.baseShadow
  }
})

export default Navigation