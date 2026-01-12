import { StyleSheet, Platform } from 'react-native';

export const ACCOUNT_COLORS = {
  CORAL: '#FFB7B2',
  BROWN: '#5D4037',
  CREAM: '#FFF9F5',
  WHITE: '#FFFFFF',
 
};

export default StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: ACCOUNT_COLORS.CREAM 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 100 
  },
  
  // --- Header Section ---
  headerContainer: { 
    marginTop: 60, 
    marginBottom: 20 
  },
  profileRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 25,
    width: '100%',
    paddingVertical: 10
  },
  
  avatarContainer: { 
    width: 80, 
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  pixelAvatar: {
    width: 80,
    height: 80,
  },

  userTextContainer: { 
    flex: 1, 
    marginLeft: 15 
  },
  
  // PIXELATED WELCOME TEXT
  welcomeText: { 
    fontFamily: 'PixelGame',
    fontSize: 14, // Scaled for pixel font
    color: ACCOUNT_COLORS.BROWN,
    textTransform: 'uppercase', // Traditional RPG style
    lineHeight: 22,
  },
  emailText: { 
    fontSize: 12, 
    color: '#A08679', 
    marginTop: 4,
    fontWeight: '600'
  },
  
  logoutBtn: { 
    padding: 10, 
    backgroundColor: '#F0E4DF', 
    borderRadius: 12,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: ACCOUNT_COLORS.BROWN,
    borderBottomWidth: 4, // "Pressable" depth
  },
  
  // PIXELATED SECTION TITLE
  sectionTitle: { 
    fontFamily: 'PixelGame',
    fontSize: 10, 
    color: '#A08679', 
    textTransform: 'uppercase', 
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 10
  },

  // --- Locker-Style Cards ---
  miniCard: {
    backgroundColor: ACCOUNT_COLORS.WHITE,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F0E4DF',
    borderBottomWidth: 6, // Thick 3D depth to match lockers
  },
  expiredCard: { 
    opacity: 0.6, 
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 2, // Flatter when expired
  },
  miniIconCircle: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15,
    borderWidth: 2,
    borderColor: ACCOUNT_COLORS.BROWN
  },
  miniInfo: { 
    flex: 1 
  },
  miniAddress: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: ACCOUNT_COLORS.BROWN, 
    marginBottom: 2 
  },
  // PIXELATED ACCESS CODE
  miniCode: { 
    fontFamily: 'PixelGame',
    fontSize: 10, 
    color: ACCOUNT_COLORS.CORAL, 
  },
  miniTime: { 
    fontSize: 10, 
    color: '#A08679',
    marginTop: 4,
    fontWeight: '600'
  },
  releaseBtn: { 
    padding: 8,
    backgroundColor: '#FFF1F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD7D7'
  },
  empty: { 
    textAlign: 'center', 
    color: '#A08679', 
    marginTop: 40, 
    fontSize: 10,
    fontFamily: 'PixelGame' 
  },
  
  sizeBadge: {
    backgroundColor: '#FFF9F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: ACCOUNT_COLORS.BROWN,
  },
  sizeBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: ACCOUNT_COLORS.BROWN,
    textTransform: 'uppercase',
  },
  // ... existing styles ...
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(93, 64, 55, 0.4)', // Muted brown overlay
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: '95%',
  backgroundColor: '#FFF9F5',
  borderRadius: 25,
  padding: 25,
  borderWidth: 4,
  borderColor: '#5D4037',
  borderBottomWidth: 10,
  alignItems: 'center',
},
pixelModalTitle: {
  fontFamily: 'PixelGame',
  fontSize: 22,
  color: '#5D4037',
  marginBottom: 10,
},
modalSubText: {
  fontSize: 14,
  color: '#8D6E63',
  marginBottom: 20,
},
hourSelector: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 25,
},
hourBtn: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#5D4037',
  backgroundColor: 'white',
},
activeHourBtn: {
  backgroundColor: '#FFB7B2', // Coral
},
hourBtnText: {
  fontFamily: 'PixelGame',
  fontSize: 10,
  color: '#5D4037',
},
confirmBtn: {
  backgroundColor: '#FFB7B2',
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 15,
  borderWidth: 3,
  borderColor: '#5D4037',
  borderBottomWidth: 6,
  width: '100%',
  alignItems: 'center',
},
cancelLink: {
  marginTop: 15,
  fontFamily: 'PixelGame',
  fontSize: 12,
  color: '#8D6E63',
  textDecorationLine: 'underline',
},
  
});