import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as StoreProvider } from 'react-redux'
import Time from "./src/pages/time/Time"
import Register from "./src/pages/register/Register"
import List from "./src/pages/list/List"
import store from './src/store/Store'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <StoreProvider store={store}>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Time" >
        <Stack.Screen
          name="Time"
          component={Time}
          options={{ title: 'Bem Vindo' }}
        />
        <Stack.Screen name="Register" options={{ title: 'Registrar uma coordenada' }} component={Register} />
        <Stack.Screen name="List" options={{ title: 'Lista' }} component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider> 
   
  );
}

export default App

