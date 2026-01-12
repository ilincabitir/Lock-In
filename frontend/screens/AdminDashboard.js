import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAuthenticated } from '../api/AuthApi';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/AdminStyle';

export default function AdminDashboard({ navigation, setIsLoggedIn }) {
  const [allReservations, setAllReservations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const response = await fetchAuthenticated('/reservations/admin/all', {}, setIsLoggedIn);
      if (response?.ok) {
        const data = await response.json();
        const sorted = data.sort((a, b) => b.reservationID - a.reservationID);
        setAllReservations(sorted);
        setFilteredData(sorted);
      }
    } catch (error) {
      console.error("Admin fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchAdminData(); }, []));

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = allReservations.filter(item => 
      item.accessCode.toLowerCase().includes(text.toLowerCase()) || 
      (item.user?.email && item.user.email.toLowerCase().includes(text.toLowerCase())) ||
      (item.space?.locationAddress && item.space.locationAddress.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const forceRelease = (id) => {
    Alert.alert("Emergency Release", "Manually free this locker?", [
      { text: "Cancel" },
      { text: "Release", style: 'destructive', onPress: async () => {
          const response = await fetchAuthenticated(`/reservations/admin/${id}/force-deactivate`, { method: 'POST' }, setIsLoggedIn);
          if (response?.ok) fetchAdminData();
      }}
    ]);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Confirm Admin Sign Out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: 'destructive', onPress: async () => {
          await AsyncStorage.clear(); 
          setIsLoggedIn(false);
      }}
    ]);
  };

  const renderAdminItem = ({ item }) => {
    const space = item.space;
    const locationName = space?.locationAddress || "Unknown Hub";
    const isInactive = space?.locationActive === false;

    // Determine status color and text based on new brown palette
    let statusConfig = { text: 'LIVE', color: '#2ECC71' }; // Green
    if (item.expired) {
        statusConfig = { text: 'OFFLINE', color: '#A08679' }; // Muted Brown/Gray
    } else if (isInactive) {
        statusConfig = { text: 'LOCKED', color: '#8D746B' }; // Medium Brown (was orange)
    }

    return (
      <View style={[styles.card, item.expired && styles.expiredCard]}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.userEmail}>{item.user?.email || "Guest User"}</Text>
            <Text style={[styles.subText, { fontStyle: isInactive ? 'italic' : 'normal' }]}>
              <Ionicons name={isInactive ? "alert-circle-outline" : "location-outline"} size={12} color="#A08679" /> 
              {" "}{locationName}{isInactive ? " (Inactive)" : ""}
            </Text>
            <View style={{ marginTop: 10 }}>
              <View style={styles.adminDataRow}>
                  <Text style={styles.adminLabel}>ID:</Text>
                  <Text style={styles.adminValue}>#{item.reservationID}</Text>
              </View>
              <View style={styles.adminDataRow}>
                <Text style={styles.adminLabel}>CODE:</Text>
                {/* Highlight code with Coral for visibility against brown */}
                <Text style={[styles.adminValue, { color: '#FFB7B2', letterSpacing: 1 }]}>{item.accessCode}</Text>
                <View style={styles.sizeBadge}>
                  <Text style={styles.sizeBadgeText}>{space?.size || "M"}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.statusTag, { backgroundColor: statusConfig.color }]}>
            <Text style={styles.statusText}>{statusConfig.text}</Text>
          </View>
        </View>
        {!item.expired && (
          <TouchableOpacity style={styles.releaseBtn} onPress={() => forceRelease(item.reservationID)}>
            <Text style={styles.releaseText}>Force Release Locker</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>System Overview</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('LockerControl')} style={styles.actionIcon}>
            <Ionicons name="business-outline" size={26} color="#5D4037" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={28} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>
      
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search User, Code, or Location..." 
        placeholderTextColor="#A08679" 
        value={search} 
        onChangeText={handleSearch} 
      />

      {loading ? (
        <ActivityIndicator size="large" color="#5D4037" style={{ marginTop: 20 }} />
      ) : (
        <FlatList 
          data={filteredData} 
          keyExtractor={(item) => item.reservationID.toString()} 
          renderItem={renderAdminItem} 
          contentContainerStyle={{ paddingBottom: 30 }} 
          ListEmptyComponent={<Text style={styles.empty}>No active reservations found in the system.</Text>} 
        />
      )}
    </View>
  );
}