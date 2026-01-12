import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  RefreshControl, Alert, Image, Modal, StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAuthenticated } from '../api/AuthApi';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import styles, { ACCOUNT_COLORS } from '../styles/AccountStyle';

export default function AccountScreen({ navigation, setIsLoggedIn }) {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Extension Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  const [extensionHours, setExtensionHours] = useState(1);

  const getAccountIcon = (userId) => {
    const icons = { 1: require('../assets/icon1.png'), 2: require('../assets/icon3.png'), 3: require('../assets/icon4.png'), 4: require('../assets/icon4.png') };
    return icons[(userId % 4) + 1] || icons[1];
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fetchData = async () => {
    try {
      const userRes = await fetchAuthenticated('/users/me', {}, setIsLoggedIn);
      if (userRes?.ok) setUser(await userRes.json());
      const resRes = await fetchAuthenticated('/reservations', {}, setIsLoggedIn);
      if (resRes?.ok) {
        const data = await resRes.json();
        setReservations(data.sort((a, b) => b.reservationID - a.reservationID));
      }
    } catch (error) { console.error(error); } finally { setLoading(false); setRefreshing(false); }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));

  // --- EXTENSION LOGIC ---

  const handleOpenExtension = (item) => {
    setSelectedRes(item);
    setExtensionHours(1); // Reset to 1 default
    setIsModalVisible(true);
  };

  const confirmExtension = async () => {
    if (!selectedRes) return;

    try {
      const response = await fetchAuthenticated(
        `/reservations/${selectedRes.reservationID}/extend`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ additionalHours: extensionHours }),
        }, 
        setIsLoggedIn
      );

      if (response.ok) {
        Alert.alert("Success", `Booking extended by ${extensionHours} hour(s)!`);
        setIsModalVisible(false);
        fetchData(); // Refresh list to show new end time
      } else {
        const errorMsg = await response.text();
        Alert.alert("Failed", errorMsg || "Could not extend time.");
      }
    } catch (e) {
      Alert.alert("Error", "Server connection failed.");
    }
  };

  const handleDeactivate = (id) => {
    Alert.alert("End Session", "Release this locker?", [
      { text: "Stay", style: "cancel" },
      { text: "Release", style: "destructive", onPress: async () => {
          const res = await fetchAuthenticated(`/reservations/${id}/deactivate`, { method: 'POST' }, setIsLoggedIn);
          if (res?.ok) fetchData();
      }}
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Safe travels! ", [
      { text: "Stay", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
      }}
    ]);
  };

  // --- RENDER RESERVATION CARD ---

  const renderReservation = ({ item }) => {
    const space = item.space;
    const isInactive = space?.locationActive === false;
    return (
      <View style={[styles.miniCard, item.expired && styles.expiredCard]}>
        <View style={[styles.miniIconCircle, { backgroundColor: item.expired ? '#D1D1D1' : ACCOUNT_COLORS.CORAL }]}>
          <Ionicons name={item.expired ? "lock-closed" : "key"} size={16} color="white" />
        </View>
        <View style={styles.miniInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={styles.miniAddress} numberOfLines={1}>
    {space?.locationAddress}
  </Text>

  {isInactive && (
    <Text style={{ 
      marginLeft: 6, 
      fontSize: 10, 
      color: '#534545', 
      fontWeight: '600' 
    }}>
      (Inactive)
    </Text>
  )}
</View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <Text style={styles.miniCode}>{item.accessCode}</Text>
            <View style={styles.sizeBadge}><Text style={styles.sizeBadgeText}>{space?.size}</Text></View>
          </View>
          <Text style={styles.miniTime}>{item.expired ? "COMPLETED" : `UNTIL ${formatTime(item.endTime)}`}</Text>
        </View>
        {!item.expired && !isInactive && (
          <View style={{ flexDirection: 'row' }}>
            {/* EXTEND BUTTON */}
            <TouchableOpacity onPress={() => handleOpenExtension(item)} style={[styles.releaseBtn, {marginRight: 8, borderColor: '#5D4037'}]}>
              <Ionicons name="add-circle-outline" size={22} color={ACCOUNT_COLORS.CORAL} />
            </TouchableOpacity>
            {/* RELEASE BUTTON */}
            <TouchableOpacity onPress={() => handleDeactivate(item.reservationID)} style={styles.releaseBtn}>
              <Ionicons name="trash-outline" size={22} color="#e5867bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // Logic for the Modal Hour Buttons
  const renderHourButtons = () => {
    if (!selectedRes) return null;

    const start = new Date(selectedRes.startTime);
    const end = new Date(selectedRes.endTime);
    const currentTotalHours = Math.round((end - start) / (1000 * 60 * 60));

    return [1,2,3,4,5].map((hr) => {
      const isDisabled = (currentTotalHours + hr) > 6;
      return (
        <TouchableOpacity 
          key={hr} 
          disabled={isDisabled}
          style={[
            styles.hourBtn, 
            extensionHours === hr && styles.activeHourBtn,
            isDisabled && { opacity: 0.3, borderColor: '#ccc' }
          ]} 
          onPress={() => setExtensionHours(hr)}
        >
          <Text style={[styles.hourBtnText, extensionHours === hr && !isDisabled && {color: 'white'}]}>+{hr}H</Text>
        </TouchableOpacity>
      );
    });
  };

  if (loading) return <View style={styles.loaderContainer}><ActivityIndicator size="large" color={ACCOUNT_COLORS.CORAL} /></View>;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.reservationID.toString()}
        renderItem={renderReservation}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); fetchData();}} />}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.profileRow}>
              <Image source={getAccountIcon(user?.userID)} style={styles.pixelAvatar} />
              <View style={styles.userTextContainer}>
                <Text style={styles.welcomeText}>Hello, {user?.name?.split(' ')[0]}!</Text>
                <Text style={styles.emailText}>{user?.email}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                
                <TouchableOpacity onPress={handleLogout} style={styles.releaseBtn}><Ionicons name="log-out-outline" size={28} color={ACCOUNT_COLORS.BROWN} /></TouchableOpacity>
              </View>
            </View>
            <Text style={styles.sectionTitle}>BOOKING HISTORY</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>NO BOOKINGS YET.</Text>}
      />

      {/* EXTENSION MODAL */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.pixelModalTitle}>EXTEND TIME </Text>
              <Text style={styles.pixelModalTitle}>$5/hour </Text>
            <Text style={styles.modalSubText}>Tourist limits: Max 6 Total Hours</Text>
            
            <View style={styles.hourSelector}>
              {renderHourButtons()}
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={confirmExtension}>
              <Text style={styles.pixelBtnText}>CONFIRM and PAY</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelLink}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav navigation={navigation} setIsLoggedIn={setIsLoggedIn} activeScreen="Account" />
    </View>
  );
}