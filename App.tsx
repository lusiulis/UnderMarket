// In App.js in a new project

import * as React from 'react';
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Components/Navigation';
import AuthNavigator from './src/Components/Navigation/AuthNavigator';
import LogIn from './src/Views/LogIn';

function App() {

  const isAuthenticated = false;
  return (
    <NavigationContainer>

      {isAuthenticated ? <Navigation /> : <LogIn />
      }
    </NavigationContainer>
  );
}

export default App;