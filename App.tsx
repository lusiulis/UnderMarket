// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Components/Navigation';
import { AuthContextProvider } from './src/Contexts/appContentProvider';

function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
