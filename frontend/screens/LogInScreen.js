import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  ActivityIndicator, Alert, ScrollView, ImageBackground 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../api/AuthApi';
import styles from '../styles/AuthStyle';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Wait!", "Please enter your email and password.");
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('jwt', data.token);
        await AsyncStorage.setItem('userRole', data.role);
        setIsLoggedIn(true);
      } else {
        Alert.alert("Login Failed", "Invalid credentials. Please try again!");
      }
    } catch (error) {
      Alert.alert("Network Error", "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/city.png')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.imageOverlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.container}>
          
          <View style={styles.loginBox}>
            <Text style={styles.pixelHeader}>Ready to LOCK IN?</Text>
            
            <TextInput 
              placeholder="Email" 
              style={styles.input} 
              value={email} 
              onChangeText={setEmail} 
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#BCAAA4"
            />
            
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              value={password} 
              secureTextEntry 
              onChangeText={setPassword} 
              placeholderTextColor="#BCAAA4"
            />

            <TouchableOpacity 
              style={[styles.mainBtn, loading && styles.disabledBtn]} 
              onPress={handleLogin} 
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.pixelBtnText}>LET'S GO!</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>New here? Create an account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <Image source={require('../assets/logo1.png')} style={styles.footerLogo} resizeMode="contain" />
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}