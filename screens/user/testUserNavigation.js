import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import UserProfile from './UserProfile';
import UserOptions from './UserOptions';
import QRScanner from './QRScanner';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserOptions">
        <Stack.Screen name="UserOptions" component={UserOptions} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
