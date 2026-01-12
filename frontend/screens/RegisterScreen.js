import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, ImageBackground } from 'react-native'; 
import { API_BASE_URL } from '../api/AuthApi';
import styles from '../styles/AuthStyle';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Wait!", "Please fill all fields. 🐾");
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Error", "Please enter a valid email address.");
    }
    if (password.length < 8) {
      return Alert.alert("Error", "Password must be at least 8 characters.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        Alert.alert("Success", "Registered successfully! Please log in. ✨");
        navigation.navigate('Login'); 
      } else {
        const serverMessage = await response.text();
        Alert.alert("Registration Failed", serverMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Server unreachable.");
    }
  };

  return (
    <ImageBackground source={require('../assets/city.png')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.imageOverlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.container}>
          
          <View style={styles.loginBox}>
            <Text style={styles.pixelHeader}>CREATE ACCOUNT</Text>
            
            <TextInput 
              placeholder="Full Name" 
              value={name} 
              onChangeText={setName} 
              style={styles.input}
              placeholderTextColor="#BCAAA4"
            />
            
            <TextInput 
              placeholder="Email" 
              value={email} 
              onChangeText={setEmail} 
              style={styles.input} 
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#BCAAA4"
            />
            
            <TextInput 
              placeholder="Password" 
              value={password} 
              onChangeText={setPassword} 
              style={styles.input} 
              secureTextEntry
              placeholderTextColor="#BCAAA4"
            />
            
            <TouchableOpacity style={styles.mainBtn} onPress={handleRegister}>
              <Text style={styles.pixelBtnText}>START JOURNEY</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <Image source={require('../assets/logo1.png')} style={styles.footerLogo} resizeMode="contain" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterScreen;