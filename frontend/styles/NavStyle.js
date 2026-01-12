import { StyleSheet } from 'react-native';

export const NAV_COLORS = {
  active: '#FFB7B2',   // Pastel Coral
  inactive: '#5D4037', // Earthy Brown
  bg: '#FFFBF2'        // Cosy Cream
};

export default StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: NAV_COLORS.bg,
    height: 75,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
    borderTopWidth: 2,
    borderTopColor: '#F0E4DF',
    elevation: 10,
  },
  navItem: { alignItems: 'center', flex: 1 },
  navLabel: { 
    fontSize: 12, 
    color: NAV_COLORS.inactive, 
    marginTop: 4, 
    fontWeight: 'bold' 
  },
  activeLabel: { color: NAV_COLORS.active },
  logoContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // This moves the logo slightly ABOVE the navbar line
  marginTop: -35, 
  zIndex: 10,
},
logoCircle: {
  width: 75,
  height: 75,
  backgroundColor: '#FFFBF0', // Matches navbar cream
  borderRadius: 40,
  borderWidth: 3,
  borderColor: '#E8DCC4', // Light brown wood/border color
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5, // Shadow for Android
  shadowColor: '#000', // Shadow for iOS
  shadowOpacity: 0.1,
  shadowRadius: 5,
},
navLogo: {
  width: 55, // Big and visible
  height: 55,
},
navBar: {
  flexDirection: 'row',
  height: 75,
  backgroundColor: '#FFFBF0',
  borderTopWidth: 3,
  borderColor: '#E8DCC4',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingBottom: 5,
},
// ... keep your other navItem styles
});