import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import styles, { BILLING_COLORS } from '../styles/BillingsStyle';

export default function ReceiptScreen({ route, navigation }) {
  const { reservation } = route.params;
  const lockerSize = reservation.space?.size || "M";
  const address = reservation.space?.locationAddress || "Locker Hub";

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const createPDF = async () => {
    const html = `
      <body style="text-align: center; font-family: 'Helvetica'; padding: 50px; background-color: #FFF9F5;">
        <h1 style="color: #5D4037;">Lock In - Receipt</h1>
        <h2 style="color: #FFB7B2;">Code: ${reservation.accessCode}</h2>
        <p>Location: ${address}</p>
        <p>Expires: ${formatDateTime(reservation.endTime)}</p>
      </body>`;
    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (e) { Alert.alert("Error", "Could not save PDF"); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        
        <View style={styles.receiptCard}>
         
          
          {/* Pixel font ONLY for the victory title */}
          <Text style={styles.pixelHeader}>LOCKED IN!</Text>
          <Text style={styles.standardText}>{address}</Text>

          <View style={styles.dashLine} />

          <Text style={styles.label}>YOUR ACCESS CODE</Text>
          {/* Pixel font for the code to make it look like a secret key */}
          <Text style={styles.pixelCode}>{reservation.accessCode}</Text>

          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.label}>SIZE</Text>
              <Text style={styles.value}>{lockerSize}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>EXPIRES</Text>
              <Text style={styles.value}>{formatDateTime(reservation.endTime)}</Text>
            </View>
          </View>

          {/* Restored Info box */}
          <View style={styles.warningBox}>
            <Ionicons name="camera-outline" size={18} color="#8E735B" />
            <Text style={styles.warningText}>Screenshot this for offline use!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.pdfBtn} onPress={createPDF}>
          <Ionicons name="download-outline" size={20} color={BILLING_COLORS.BROWN} />
          <Text style={styles.pdfBtnText}>Save as PDF / Print</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Account')}>
          <Text style={styles.payText}>DONE</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}