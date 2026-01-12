import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  Image 
} from 'react-native'; 
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { fetchAuthenticated } from '../api/AuthApi';
import mapStyles from '../styles/UserMapStyle'; 
import BottomNav from '../components/BottomNav';

// Fallback coordinates if GPS fails (Timișoara Center)
const TIMISOARA_CENTER = { 
  latitude: 45.7558, 
  longitude: 21.2287, 
  latitudeDelta: 0.01, 
  longitudeDelta: 0.01 
};

const SOLID_VIVID_STYLE = [
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#74CCF4" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#F9F1E7" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#FFFFFF" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#99C68E" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#FFCCBC" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#4E342E" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] } 
];

export default function UserMapScreen({ navigation, setIsLoggedIn }) {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null); 

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permission Denied", "Location access is needed to find lockers near you.");
          setLoading(false);
          fetchHubs();
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
        
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.008, // Zoom level for the user
          longitudeDelta: 0.008,
        };

        setUserLocation(userCoords);
        
        // Animate map to user location immediately upon detection
        if (mapRef.current) {
          mapRef.current.animateToRegion(userCoords, 1500);
        }

        fetchHubs();
      }  catch (error) {
  
  console.warn("Location not accurate:", error.message); 
  setLoading(false);
  fetchHubs();
}
    })();
  }, []);

  const fetchHubs = async () => {
    try {
      const response = await fetchAuthenticated('/locations', {}, setIsLoggedIn); 
      if (response.ok) {
        const data = await response.json();
        setLocations(data.filter(loc => loc.active !== false));
      }
    } catch (e) { 
      console.error('Error fetching hubs:', e); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F1E7' }}>
      <MapView 
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={mapStyles.map} 
        customMapStyle={SOLID_VIVID_STYLE}
        // Map starts at Timisoara Center but will animate to User in useEffect
        initialRegion={TIMISOARA_CENTER} 
        showsUserLocation={true} 
        minZoomLevel={14} 
        maxZoomLevel={20} 
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {locations.map(loc => (
          <Marker
            key={loc.locationID}
            coordinate={{ 
              latitude: Number(loc.latitude), 
              longitude: Number(loc.longitude) 
            }}
            anchor={{ x: 0.5, y: 1 }} 
            onPress={() => navigation.navigate('LockerDesign', { 
              locationId: loc.locationID, 
              address: loc.address 
            })}
          >
            <View style={mapStyles.markerContainer}>
                <Image 
                  source={require('../assets/pin.png')}
                  style={mapStyles.customPinIcon}
                  resizeMode="contain"
                />
            </View>
          </Marker>
        ))}
      </MapView>
      
      <TouchableOpacity 
        style={mapStyles.helpBtn}
        onPress={() => navigation.navigate('HelpScreen')}
      >
        <Ionicons name="help-circle" size={30} color="#e3999cff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={mapStyles.recenterBtn}
        onPress={() => {
            if(userLocation) {
                mapRef.current.animateToRegion(userLocation, 1000);
            } else {
                Alert.alert("Location not found", "Still trying to get your GPS signal...");
            }
        }}
      >
        <Ionicons name="navigate" size={24} color="#e59ea0ff" />
      </TouchableOpacity>

      <BottomNav navigation={navigation} setIsLoggedIn={setIsLoggedIn} activeScreen="Map" />
      
      {loading && (
        <View style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20 }}>
          <ActivityIndicator size="large" color="#e9abadff" />
        </View>
      )}
    </View>
  );
}