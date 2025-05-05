import React from 'react';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigations/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
