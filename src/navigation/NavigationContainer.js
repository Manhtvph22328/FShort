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
import ShirtDetail from '../screens/ShirtDetailScreen';
import InputSearchModal from '../screens/InputSearch';
import AllProduct from '../screens/AllProduct';
import Favorite from '../screens/Favorite';
import OrderScreen from '../screens/OrderScreen';
import EditProfileScreen from '../screens/EditProfile';
import OrderHistory from '../screens/OrderHistory';
import Orderdetail from '../screens/Orderdetail';
import Evaluate from '../screens/Evaluate';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import OrderDone from '../screens/orderDone';
import ProductReview from '../screens/ProductCanReview';
import Notification from '../screens/Notification';
import InformationScreen from '../screens/InformationScreen';
import ChatScreen from '../screens/Chat';

const Stack = createNativeStackNavigator();
const linking = {
    prefixes: ['fshort--android://'],
    config: {
        screens: {
            Tabs: '',
            OrderDone: 'orderdone',
        },
    },
};

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
    <Stack.Screen name="ShirtDetail" component={ShirtDetail} options={{ headerShown: false }} />
    <Stack.Screen name="InputSearch" component={InputSearchModal} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AllSp" component={AllProduct} options={{ headerShown: false }} />
    <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
    <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
    <Stack.Screen name="OrderDone" component={OrderDone} options={{ headerShown: false }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Orderdetail" component={Orderdetail} options={{ headerShown: false }} />
    <Stack.Screen name="Evaluate" component={Evaluate} options={{ headerShown: false }} />
    <Stack.Screen name="ProductReview" component={ProductReview} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    <Stack.Screen name="Information" component={InformationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const NavigationContainerComponent = () => {
  return (
    <NavigationContainer linking={linking}>
    <AuthStackScreen/>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;
