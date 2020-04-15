// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import {ChatScreen, StarterScreen} from './src/Screens'
import ReduxStore from './src/Redux/Reducers'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={ createStore(ReduxStore) } >
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Starter' >
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Starter" component={StarterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;