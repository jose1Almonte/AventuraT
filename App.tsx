import React from 'react';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import DetailsScreenUser from './Screens/DetailsScreen/DetailsScreenUser';
import DetailsScreenBusiness from './Screens/DetailsScreen/DetailsScreenBusiness';
import { UserProfileScreen } from './Screens/UserProfileScreen/UserProfileScreen';
import BusinessProfileScreen from './Screens/BusinessProfileScreen/BusinessProfileScreen';
import NavbarScreen from './Screens/NavbarScreen/NavbarScreen';
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import FavoriteScreen from './Screens/FavoriteScreen/FavoriteScreen';
import SearchResultScreen from './Screens/SearchResultScreen/SearchResultScreen';
import RatingsScreen from './Screens/RatingsScreen/RatingsScreen';
import FeedbackScreen from './Screens/FeedbackScreen/FeedbackScreen';
import EnterpriseFormScreen from './Screens/EnterpriseFormScreen/EnterpriseFormScreen';
import EnterpriseSessionScreen from './Screens/EnterpriseSessionScreen/EnterpriseSessionScreen';
import { UserProvider } from './Context/UserContext';
import MobilePaymentScreen from './Screens/MobilePaymentScreen/MobilePaymentScreen';
import CreatePackageFormScreen from './Screens/CreatePackageFormScreen/CreatePackageFormScreen';
import HelpdeskScreen from './Screens/HelpdeskScreen/HelpdeskScreen';
import AdministratePackagesScreen from './Screens/AdministratePackagesScreen/AdministratePackagesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HelpdeskScreen" component={HelpdeskScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AdministratePackagesScreen" component={AdministratePackagesScreen} options={{headerShown: false}}/>
          <Stack.Screen name="CreatePackageFormScreen" component={CreatePackageFormScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MobilePaymentScreen" component={MobilePaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsScreenUser" component={DetailsScreenUser} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsScreenBusiness" component={DetailsScreenBusiness} options={{ headerShown: false }} />
          <Stack.Screen name="BusinessProfileScreen" component={BusinessProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NavbarScreen" component={NavbarScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RatingsScreen" component={RatingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnterpriseFormScreen" component={EnterpriseFormScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EnterpriseSessionScreen" component={EnterpriseSessionScreen} options={{ headerShown: false }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
