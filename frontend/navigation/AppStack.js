import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// 1. IMPORT ALL SCREENS
import UserMapScreen from '../screens/UserMapScreen';
import AccountScreen from '../screens/AccountScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import AdminDashboard from '../screens/AdminDashboard';
import AdminLockerControl from '../screens/AdminLockerControl';
import LockerDesignView from '../screens/LockerDesignView';
import HelpScreen from '../screens/HelpScreen'; // <--- ADDED THIS

const Stack = createStackNavigator();

export default function AppStack({ setIsLoggedIn, userRole }) {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        animation: 'none', // Keeps navigation instant and clean
      }}
    >
      {userRole === 'ADMIN' ? (
        // --- ADMIN VIEW ---
        <>
          <Stack.Screen name="AdminDashboard">
            {(props) => <AdminDashboard {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="LockerControl">
             {(props) => <AdminLockerControl {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        </>
      ) : (
        // --- USER VIEW ---
        <>
          <Stack.Screen name="UserMap" component={UserMapScreen} />
          
          <Stack.Screen name="LockerDesign">
            {(props) => <LockerDesignView {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>

          <Stack.Screen name="Account">
            {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} />

          {/* --- ADDED HELP SCREEN HERE --- */}
          <Stack.Screen name="HelpScreen" component={HelpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}