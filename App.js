/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {LogContextProvier} from './contexts/LogContext';
import RootStack from './screens/RootStack';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <LogContextProvier>
        <RootStack />
      </LogContextProvier>
    </NavigationContainer>
  );
}
