import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from "@react-navigation/compat";
import { NavigationContainer } from '@react-navigation/native';


import RegisterDevice from './RegisterDevice';
import RegistrationComplete from './RegistrationComplete';
import DeviceScanner from './DeviceScanner';
import DeviceOptions from './DeviceOptions';
import DevicesList from '../List/DevicesList';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DeviceHome">
        <Stack.Screen name="DeviceHome" component={DeviceOptions} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="RegisterDevice" component={RegisterDevice} options={{
          title: 'Register Device',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="RegistrationComplete" component={RegistrationComplete} />
        <Stack.Screen name="DeviceScanner" component={DeviceScanner} options={{
          title: 'Get Device',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#3C484F',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
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
