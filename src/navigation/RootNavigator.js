import React, { useContext } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';
import AuthStackScreen from './NavigationContainer';
import TabNavigator from './TabNavigator';

const RootNavigator = () => {
  const { user, token } = useContext(AuthContext);

  return token ? <TabNavigator /> : <AuthStackScreen />;
};

export default RootNavigator;
