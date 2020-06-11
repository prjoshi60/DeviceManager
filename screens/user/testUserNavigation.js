import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import UserProfile from './UserProfile';
import UserOptions from './UserOptions';
import QRScanner from './QRScanner';
import DevicesList from '../List/DevicesList';
 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserOptions">
        <Stack.Screen name="UserOptions" component={UserOptions} options={{
          title: 'User Dashboard',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="QRScanner" component={QRScanner} options={{
          title: 'QR SCAN',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="DevicesList" component={DevicesList} options={{
          title: 'Devices List',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
