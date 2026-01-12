import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { NAV_COLORS } from '../styles/NavStyle';

export default function BottomNav({ navigation, activeScreen }) {
  return (
    <View style={styles.navBar}>
      {/* Map Scene */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('UserMap')}
      >
        <Ionicons 
          name={activeScreen === 'Map' ? "map" : "map-outline"} 
          size={24} 
          color={activeScreen === 'Map' ? NAV_COLORS.active : NAV_COLORS.inactive} 
        />
        <Text style={[styles.navLabel, activeScreen === 'Map' && styles.activeLabel]}>
          Map
        </Text>
      </TouchableOpacity>

      {/* --- BIGGER CENTER LOGO --- */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image 
            source={require('../assets/logo1.png')} 
            style={styles.navLogo}
            resizeMethod="scale" 
            fadeDuration={0} 
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Account Scene */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Account')}
      >
        <Ionicons 
          name={activeScreen === 'Account' ? "person" : "person-outline"} 
          size={24} 
          color={activeScreen === 'Account' ? NAV_COLORS.active : NAV_COLORS.inactive} 
        />
        <Text style={[styles.navLabel, activeScreen === 'Account' && styles.activeLabel]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}