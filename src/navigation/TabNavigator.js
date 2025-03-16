import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyCarScreen from '../screens/MyCarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getIcon = (route, focused) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused
        ? require('../assets/homeOpen.png')
        : require('../assets/homeClose.png');
    } else if (route.name === 'Search') {
      iconName = focused
        ? require('../assets/searchOpen.png')
        : require('../assets/searchClose.png');
    } else if (route.name === 'Car') {
      iconName = focused
        ? require('../assets/carOpen.png')
        : require('../assets/carClose.png');
    } else if (route.name === 'Profile') {
      iconName = focused
        ? require('../assets/profileOpen.png')
        : require('../assets/profileClose.png');
    }
    return <Image source={iconName} style={{ width: 24, height: 24 }} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ focused }) => getIcon(route, focused),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Trang Chủ' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen} 
        options={{ title: 'Tìm kiếm' }}
      />
      <Tab.Screen
        name="Car"
        component={MyCarScreen}
        options={{ title: 'Gio Hang' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Cá Nhân' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
