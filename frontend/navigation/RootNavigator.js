import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then(token => setIsLoggedIn(!!token))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // optionally a loading spinner

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
