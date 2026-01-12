import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const API_BASE_URL = 'http://10.0.2.2:8080';

export const setAuthToken = async (token) => {
  if (!token) return;
  try { 
    await AsyncStorage.setItem('jwt', token); 
    console.log('Token stored as jwt'); 
  } catch (e) { 
    console.error('Failed to store token', e); 
  }
};

export const getAuthToken = async () => {
  try { 
    return await AsyncStorage.getItem('jwt'); 
  } catch (e) { 
    return null; 
  }
};

export const clearAuthToken = async () => {
  try { 
   
    await AsyncStorage.clear(); 
    console.log('Storage cleared'); 
  } catch (e) { 
    console.error('Failed to clear token', e); 
  }
};

export const fetchAuthenticated = async (url, options = {}, setIsLoggedIn) => {
  try {
    const token = await getAuthToken();
    const headers = { 
      'Content-Type': 'application/json', 
      ...options.headers 
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    } else {
   
      if (setIsLoggedIn) setIsLoggedIn(false);
      
      return { ok: false, status: 401 }; 
    }

    const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

if (response.status === 401 || response.status === 403) {
  const token = await getAuthToken();

  if (token && setIsLoggedIn) {
     await clearAuthToken();
     setTimeout(() => setIsLoggedIn(false), 100);
     Alert.alert('Session Expired', 'Please log in again.');
  }
  return { ok: false, status: response.status };
}

    return response;

  } catch (error) {

    console.error("Network request failed:", error);
 
    return { ok: false, status: 503, message: "Network Error" }; 
  }
};