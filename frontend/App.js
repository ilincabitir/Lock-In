import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './navigation/Authstack';
import AppStack from './navigation/AppStack';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // App.js
// App.js
useEffect(() => {
  const checkStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const role = await AsyncStorage.getItem('userRole');
      
      if (token && role) {
        // Update both at once to ensure they are in sync
        setUserRole(role);
        setIsLoggedIn(true);
      } else {
        // Clear everything if either is missing
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } catch (e) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };
  checkStatus();
}, [isLoggedIn]); // This re-runs whenever isLoggedIn flips

  if (isLoading) return null; // Or a Splash Screen

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        // Passing userRole here allows AppStack to decide 
        // whether to show the Admin or User screens
        <AppStack setIsLoggedIn={setIsLoggedIn} userRole={userRole} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}