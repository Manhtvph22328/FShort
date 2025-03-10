import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomScreen';
import OnboardScreen from '../screens/OnboardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="WelcomeScreen">
    <AuthStack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="OnBoard"
      component={OnboardScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const Navigation = () => {

  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>

  );
};

export default Navigation;