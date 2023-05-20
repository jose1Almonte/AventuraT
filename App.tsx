import React from 'react';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import DetailsScreen from './Screens/DetailsScreen/DetailsScreen';
import UserProfileScreen from './Screens/UserProfileScreen/UserProfileScreen';
import BusinessProfileScreen from './Screens/BusinessProfileScreen/BusinessProfileScreen';
import NavbarScreen from './Screens/NavbarScreen/NavbarScreen';
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import { UserProvider } from './Context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BusinessProfileScreen"
          component={BusinessProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NavbarScreen"
          component={NavbarScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
