import React from 'react';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import DetailsScreen from './Screens/DetailsScreen/DetailsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component= {HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailsScreen" component= {DetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component= {LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
