import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { fetchAuthenticated } from '../api/AuthApi';
import styles, { BILLING_COLORS } from '../styles/BillingsStyle';
import BottomNav from '../components/BottomNav';

export default function PaymentScreen({ route, navigation, setIsLoggedIn }) {
  const { spaceId, address, size, lockerNumber } = route.params;
  const [selectedHours, setSelectedHours] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const pricePerHour = 5; 

  const handleConfirmReservation = async () => {
    setIsProcessing(true);
    try {
      const response = await fetchAuthenticated('/reservations', {
        method: 'POST',
        body: JSON.stringify({
          spaceId: spaceId,
          hours: selectedHours
        })
      }, setIsLoggedIn);

      if (response && response.status === 201) {
        const reservationData = await response.json();
        navigation.navigate('Receipt', { 
          reservation: reservationData,
          lockerNumber: lockerNumber 
        });
      } else {
        Alert.alert("Error", "Reservation failed. Please check your connection. 🐾");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        {/* Pixelated Header */}
        <Text style={styles.pixelHeader}>CONFIRM BOOKING </Text>
        <Text style={styles.standardText}>{address}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>SELECTED SLOT</Text>
          <Text style={styles.infoValue}>{size} </Text>
        </View>

        <Text style={styles.label}>HOW MANY HOURS?</Text>
        <View style={styles.hoursGrid}>
          {[1, 2, 3, 4, 5, 6].map((h) => (
            <TouchableOpacity 
              key={h} 
              style={[styles.hourBtn, selectedHours === h && styles.selectedBtn]}
              onPress={() => setSelectedHours(h)}
              disabled={isProcessing}
            >
              <Text style={[styles.hourText, selectedHours === h && styles.selectedText]}>{h}h</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.label}>TOTAL TO PAY</Text>
          {/* Pixelated Price for game aesthetic */}
          <Text style={styles.priceValue}>${selectedHours * pricePerHour}.00</Text>
        </View>

        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.disabledBtn]} 
          onPress={handleConfirmReservation}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payText}>PAY & LOCK IN</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.cancelLink}
          disabled={isProcessing}
        >
          <Text style={styles.cancelText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
      <BottomNav navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
    </View>
  );
}