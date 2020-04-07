/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import reducer from './lib/reducer';


const store = createStore(reducer);

import Home from './screens/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );
};

export default App;
