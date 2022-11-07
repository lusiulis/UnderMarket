// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Components/Navigation';
import AuthNavigation from './src/Components/Navigation/AuthNavigation';

function App() {
  const isAuthenticated = false;
  return (
    <NavigationContainer>
      {isAuthenticated ? <Navigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default App;
