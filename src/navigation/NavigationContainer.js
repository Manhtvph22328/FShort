import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomScreen from '../screens/WelcomScreen';
import OnboardScreen from '../screens/OnboardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyCarScreen from '../screens/MyCarScreen';
import InputSearchModal from '../screens/InputSearch';

const Stack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <Stack.Navigator initialRouteName="WelcomeScreen">
    <Stack.Screen name="WelcomeScreen" component={WelcomScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OnBoard" component={OnboardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Car" component={MyCarScreen} options={{ headerShown: false }} />
    <Stack.Screen name="InputSearch" component={InputSearchModal} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const NavigationContainerComponent = () => {
  return (
    <NavigationContainer>
     <AuthStackScreen/>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;