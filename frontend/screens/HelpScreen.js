import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/HelpStyle';

export default function HelpScreen({ navigation }) {
  const handleEmail = () => {
    Linking.openURL('mailto:support@lockin-timisoara.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#4E342E" />
        </TouchableOpacity>
        <Text style={styles.pixelHeader}>HELP CENTER</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Peeking Mascot */}
        <View style={styles.mascotHelperContainer}>
          <Image 
            source={require('../assets/mascot 1.png')} 
            style={styles.helperMascotImg}
            resizeMode="contain"
          />
          <View style={styles.helperBubble}>
            <Text style={{ fontFamily: 'PixelGame', color: 'beige', fontSize: 15 }}>HELLO TRAVELER!</Text>
          </View>
        </View>

       {/* SECTION 1: STORAGE SIZES */}
<View style={styles.section}>
  <View style={styles.card}>
    {/* Welcoming Badge */}
    <View style={[styles.featureBadge, { backgroundColor: '#E0EAE2' }]}>
      <Text style={styles.pixelBadgeText}>FIND YOUR PERFECT FIT</Text>
    </View>

    <Text style={styles.itemTitle}>Storage Selection</Text>
    
    <View style={styles.sentenceBox}>
      <Text style={styles.welcomeText}>
         We provide three calibrated sizes to protect everything from your daily tech to your vacation luggage.
      </Text>
    </View>

    {/* IMPROVED DIAGRAM WITH MEASUREMENTS */}
    <View style={styles.diagramContainer}>
      {/* SMALL */}
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.lockerBox, { width: 45, height: 45, borderRadius: 8 }]} />
        <Text style={[styles.measureText, { marginTop: 8 }]}>SMALL</Text>
        <Text style={styles.dimensionSubText}>30 x 35 cm</Text>
      </View>

      {/* MEDIUM */}
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.lockerBox, { width: 65, height: 65, borderRadius: 10 }]} />
        <Text style={[styles.measureText, { marginTop: 8 }]}>MEDIUM</Text>
        <Text style={styles.dimensionSubText}>45 x 50 cm</Text>
      </View>

      {/* LARGE */}
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.lockerBox, { width: 85, height: 95, borderRadius: 12 }]} />
        <Text style={[styles.measureText, { marginTop: 8 }]}>LARGE</Text>
        <Text style={styles.dimensionSubText}>60 x 90 cm</Text>
      </View>
    </View>
    
    <Text style={[styles.itemDesc, { textAlign: 'center', marginTop: 20, fontSize: 12, fontStyle: 'italic' }]}>
        *Depths are standardized at 50cm for all units.
    </Text>
  </View>
</View>


  {/* SECTION 3: RULES */}
        <View style={styles.section}>
          <View style={styles.card}>
             <View style={[styles.featureBadge, { backgroundColor: '#E0EAE2' }]}>
      <Text style={styles.pixelBadgeText}>WHAT TO KEEP IN MIND</Text>
    </View>

            <Text style={styles.itemTitle}>Locker Protocol</Text>
            <View style={styles.sentenceBox}>
              <Text style={styles.itemDesc}>Always confirm the door is firmly clicked shut before leaving the hub.</Text>
            </View>
            <View style={styles.sentenceBox}>
              <Text style={styles.itemDesc}>Your 6-digit PIN is private. You can find it in your active booking tab anytime.</Text>
            </View>
          </View>
        </View>




{/* SECTION 2: ABOUT LOCK IN */}
<View style={styles.section}>
  <View style={styles.card}>
    <View style={styles.featureBadge}>
      <Text style={styles.pixelBadgeText}>MISSION CONTROL</Text>
    </View>

    <Text style={styles.itemTitle}>About Lock In</Text>
    
    <Text style={styles.aboutParagraph}>
      We created Lock In to give you the freedom to explore Timișoara without the weight of your luggage. 
      Whether you arrive early or have a late flight, we bridge the gap between your travel and your check-in.
    </Text>

    <View style={styles.divider} />

    {/* SECURITY FEATURE 1: LOCK TECH */}
    <View style={styles.securityFeatureRow}>
      <View style={styles.iconSquare}>
        <Ionicons name="shield-checkmark" size={22} color="#4E342E" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>High-Security Tech</Text>
        <Text style={styles.featureSub}>
          Reinforced steel units with cloud-encrypted digital locks.
        </Text>
      </View>
    </View>

    {/* SECURITY FEATURE 2: SURVEILLANCE */}
    <View style={styles.securityFeatureRow}>
      <View style={styles.iconSquare}>
        <Ionicons name="videocam" size={22} color="#4E342E" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>24/7 Monitoring</Text>
        <Text style={styles.featureSub}>
          Constant video surveillance at every hub for your protection.
        </Text>
      </View>
    </View>

    {/* SECURITY FEATURE 3: LIVE ALERTS */}
    <View style={styles.securityFeatureRow}>
      <View style={styles.iconSquare}>
        <Ionicons name="notifications" size={22} color="#4E342E" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>Instant Notifications</Text>
        <Text style={styles.featureSub}>
          Get real-time app alerts if your reservation is about to expire.
        </Text>
      </View>
    </View>

    {/* SECURITY FEATURE 4: INSURANCE */}
    <View style={[styles.securityFeatureRow, { marginBottom: 10 }]}>
      <View style={styles.iconSquare}>
        <Ionicons name="lock-closed" size={22} color="#4E342E" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>Tamper Detection</Text>
        <Text style={styles.featureSub}>
          Advanced sensors detect and report unauthorized access immediately.
        </Text>
      </View>
    </View>
  </View>
</View>

      
        {/* FOOTER SECTION WITH EMAIL */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.contactBox} onPress={handleEmail}>
            <Ionicons name="mail" size={20} color="#4E342E" />
            <Text style={styles.emailText}>CONTACT@LOCKIN.COM</Text>
          </TouchableOpacity>
          
          <Image 
            source={require('../assets/logo1.png')} 
            style={styles.footerLogo} 
            resizeMode="contain" 
          />
        </View>

      </ScrollView>
    </View>
  );
}