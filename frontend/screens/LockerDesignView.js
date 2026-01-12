import React, { useEffect, useState } from 'react';
import { 
  View, Text, Alert, TouchableOpacity, ScrollView, 
  ActivityIndicator, ImageBackground, Dimensions 
} from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAuthenticated } from '../api/AuthApi';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/LockerStyle';
import BottomNav from '../components/BottomNav';

const { width, height } = Dimensions.get('window');

const COLORS = {
  BROWN: '#4E342E',    // Map label brown
  CORAL: '#FFCCBC',    // Map highway peach
  CREAM: '#F9F1E7',    // Map landscape cream
  SAGE: '#E0EAE2',     // Soft sage accent
  WHITE: '#FFFFFF',
  RED: '#E74C3C', 
  GREEN: '#27AE60' 
};

export default function LockerDesignView({ navigation, setIsLoggedIn }) {
  const route = useRoute();
  const { locationId, address } = route.params;
  const [lockerSpaces, setLockerSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'PixelGame': require('../assets/fonts/PressStart2P-Regular.ttf'), 
  });

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetchAuthenticated(`/locations/${locationId}/spaces`, {}, setIsLoggedIn);
        if (response?.ok) {
          const data = await response.json();
          setLockerSpaces(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, [locationId]);

  const renderSizeOption = (sizeLabel, color, shadowColor, textColor) => {
    const matching = lockerSpaces.filter(s => s.size === sizeLabel && s.active !== false);
    const availableCount = matching.filter(s => s.available).length;
    const firstAvailable = matching.find(s => s.available);
    const isSoldOut = availableCount === 0;

    return (
      <TouchableOpacity 
        key={sizeLabel} 
        activeOpacity={isSoldOut ? 1 : 0.8}
        style={[styles.lockerBox, { backgroundColor: color, borderBottomColor: shadowColor }]}
        onPress={() => {
          if (!isSoldOut && firstAvailable) {
            navigation.navigate('Payment', { 
              spaceId: firstAvailable.spaceID, 
              address, 
              size: sizeLabel 
            });
          } else {
            Alert.alert("EMPTY", `NO ${sizeLabel} SLOTS!`);
          }
        }}
      >
        <View style={styles.lockerVent} />
        <View style={styles.lockerVent} />
        
        <View style={styles.lockerContent}>
          <Text style={[styles.lockerText, { color: textColor }]}>
            {sizeLabel}
          </Text>
          <Text style={[styles.statusText, { color: isSoldOut ? '#E74C3C' : '#27AE60' }]}>
            {isSoldOut ? "0 LEFT" : `${availableCount} LEFT`}
          </Text>
        </View>

        <View style={[styles.lockerHandle, { backgroundColor: shadowColor }]} />
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded || loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={COLORS.CORAL} />
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground 
        source={require('../assets/locker_background.png')} 
        style={[styles.backgroundImage, { width: width, height: height }]}
        resizeMode="stretch"
        blurRadius={2} // Very slight blur to keep the image visible but clean
      />

      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.signageBox}>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        <View style={styles.uiPlaque}>
          <Text style={styles.pixelHeaderText}>SELECT SIZE</Text>
        </View>

        <View style={styles.lockerGrid}>
          {/* Colors matched to Map Palette */}
          {renderSizeOption('SMALL', '#dda48fff', COLORS.BROWN, COLORS.BROWN)} 
          {renderSizeOption('MEDIUM', COLORS.CORAL, COLORS.BROWN, COLORS.BROWN)}
          {renderSizeOption('LARGE', '#D3B8AE', COLORS.BROWN, COLORS.BROWN)}
        </View>
      </ScrollView>
      
      <BottomNav navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
    </View>
  );
}