import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fetchAuthenticated } from '../api/AuthApi';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AdminStyle';

const TIMISOARA_CENTER = { latitude: 45.7489, longitude: 21.2087, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const TIMISOARA_BOUNDS = { bottomLeft: { latitude: 45.68, longitude: 21.05 }, topRight: { latitude: 45.85, longitude: 21.35 } };

export default function AdminLockerControl({ navigation, setIsLoggedIn }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState('');
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [editNameText, setEditNameText] = useState(''); 
  const mapRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAuthenticated('/locations', {}, setIsLoggedIn);
      if (res?.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleGeocode = async () => {
    if (!newAddress.trim()) return Alert.alert("Empty Input", "Type an address to search.");
    setIsSearching(true);
    Keyboard.dismiss();
    try {
      const query = `${newAddress}, Timisoara, Romania`; 
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
      const response = await fetch(url, { headers: { 'User-Agent': 'LockInApp/1.0' } });
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const foundCoord = { latitude: parseFloat(result.lat), longitude: parseFloat(result.lon) };
        setPickedLocation(foundCoord);
        mapRef.current?.animateToRegion({ ...foundCoord, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 1000);
      } else {
        Alert.alert("Not Found", "Address not found in Timisoara.");
      }
    } catch (error) {
      Alert.alert("Error", "Map service unavailable.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddLocation = async () => {
    if (!newAddress || !pickedLocation) return Alert.alert("Missing Info", "Set address and pin location.");
    const res = await fetchAuthenticated('/locations', {
      method: 'POST',
      body: JSON.stringify({ address: newAddress, latitude: pickedLocation.latitude, longitude: pickedLocation.longitude })
    }, setIsLoggedIn);
    
    if (res?.ok) {
      setNewAddress('');
      setPickedLocation(null);
      loadData();
      Alert.alert("Success", "Location added successfully.");
    }
  };

  const saveUpdatedLocation = async (id) => {
    if (!editNameText.trim()) return Alert.alert("Error", "Address cannot be empty.");
    const res = await fetchAuthenticated(`/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ address: editNameText })
    }, setIsLoggedIn);
    if (res?.ok) {
      setEditingId(null);
      loadData(); 
    }
  };

  const saveSpace = async (locationId, size) => {
    const res = await fetchAuthenticated(`/locations/${locationId}/spaces`, {
      method: 'POST',
      body: JSON.stringify({ size: size })
    }, setIsLoggedIn);
    if (res?.ok) loadData();
  };

  const deleteItem = async (id, type) => {
    Alert.alert("Delete", `Remove this ${type}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: 'destructive', onPress: async () => {
          const url = type === 'location' ? `/locations/${id}` : `/spaces/${id}`;
          const res = await fetchAuthenticated(url, { method: 'DELETE' }, setIsLoggedIn);
          if (res?.ok) loadData(); 
        }
      }
    ]);
  };

  const renderSizeStock = (location, sizeLabel) => {
    const activeSpaces = (location.spaces || []).filter(s => s.active !== false && s.size === sizeLabel);
    const count = activeSpaces.length;

    return (
      <View style={styles.adminSpaceRow} key={`${location.locationID}-${sizeLabel}`}>
        <Text style={styles.adminSpaceText}>{sizeLabel}: {count} total</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <TouchableOpacity onPress={() => saveSpace(location.locationID, sizeLabel)} style={{marginRight: 15, padding: 4}}>
             <Ionicons name="add-circle" size={26} color="#2ECC71" />
           </TouchableOpacity>
           
           {count > 0 && (
             <TouchableOpacity onPress={() => deleteItem(activeSpaces[0].spaceID, 'space')} style={{padding: 4}}>
               <Ionicons name="remove-circle" size={26} color="#E74C3C" />
             </TouchableOpacity>
           )}
        </View>
      </View>
    );
  };

  if (loading && locations.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#FFF9F5', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#5D4037" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#5D4037" />
            <Text style={styles.backText}>Dashboard</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Infrastructure Control</Text>

        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={TIMISOARA_CENTER}
          minZoomLevel={12}
          maxZoomLevel={20}
          cameraBoundary={{ coordinateBounds: TIMISOARA_BOUNDS, allowOverpanning: false }}
          onLongPress={(e) => setPickedLocation(e.nativeEvent.coordinate)}
        >
          {locations.map(loc => (
            <Marker 
              key={`loc-${loc.locationID}`} 
              coordinate={{ latitude: Number(loc.latitude), longitude: Number(loc.longitude) }} 
              pinColor="#5D4037" // Existing hubs are established BROWN
              title={loc.address}
            />
          ))}
          {/* New/Temporary pin is CORAL to stand out */}
          {pickedLocation && <Marker coordinate={pickedLocation} pinColor="#FFB7B2" title="New Hub Location" />}
        </MapView>

        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Add New Hub</Text>
          <View style={styles.searchRow}>
            <TextInput 
              placeholder="Enter Address eg. 'Iulius Mall'..." 
              style={[styles.input, { flex: 1 }]}
              value={newAddress}
              onChangeText={setNewAddress}
              placeholderTextColor="#A08679"
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleGeocode} disabled={isSearching}>
              {isSearching ? <ActivityIndicator color="white" size="small" /> : <Ionicons name="search" size={20} color="white" />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleAddLocation}>
           
            <Text style={styles.btnText}>Save Location Pin</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Manage Inventory</Text>

        {locations.filter(loc => loc.active !== false).map(loc => (
          <View key={loc.locationID} style={styles.locCard}>
            <View style={styles.locHeader}>
              {editingId === loc.locationID ? (
                <View style={styles.editContainer}>
                  <TextInput style={styles.editInput} value={editNameText} onChangeText={setEditNameText} autoFocus multiline />
                  <TouchableOpacity onPress={() => saveUpdatedLocation(loc.locationID)} style={{padding: 5}}><Ionicons name="checkmark-circle" size={28} color="#2ECC71" /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditingId(null)} style={{padding: 5}}><Ionicons name="close-circle" size={28} color="#E74C3C" /></TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text style={styles.locName}>{loc.address}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => { setEditingId(loc.locationID); setEditNameText(loc.address); }} style={{marginRight: 12, padding: 4}}>
                        <Ionicons name="create-outline" size={20} color="#5D4037" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItem(loc.locationID, 'location')} style={{padding: 4}}>
                        <Ionicons name="trash-outline" size={20} color="#E74C3C" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            <View style={{marginTop: 5}}>
               {renderSizeStock(loc, 'SMALL')}
               {renderSizeStock(loc, 'MEDIUM')}
               {renderSizeStock(loc, 'LARGE')}
            </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}