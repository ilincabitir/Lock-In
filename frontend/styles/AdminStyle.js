import { StyleSheet } from 'react-native';

// DEFINED COLOR PALETTE - More Brown, Less Pink
const ADMIN_COLORS = {
  CREAM: '#FFF9F5',       // Main Background
  BROWN: '#5D4037',       // Primary Text, Main Buttons
  MEDIUM_BROWN: '#8D746B',// Secondary Accents, Borders (Replaces some Coral)
  LIGHT_BROWN: '#F0E4DF', // Subtle Backgrounds, dividers
  CORAL: '#FFB7B2',       // Highlights, New Items only
  MUTED: '#A08679',       // Labels, subtext
  GREEN: '#2ECC71',       // Success, Live
  RED: '#E74C3C',         // Destructive, Offline
  WHITE: '#FFFFFF'
};

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: ADMIN_COLORS.CREAM, paddingHorizontal: 20 },
  
  // --- HEADER ---
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 60, 
    marginBottom: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: ADMIN_COLORS.BROWN },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { padding: 8, backgroundColor: ADMIN_COLORS.LIGHT_BROWN, borderRadius: 12, marginRight: 10 },
  logoutIcon: { padding: 8, backgroundColor: '#FEEEEE', borderRadius: 12 },

  // --- SEARCH BAR ---
  searchBar: {
    backgroundColor: ADMIN_COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.LIGHT_BROWN,
    marginBottom: 20,
    color: ADMIN_COLORS.BROWN,
    fontWeight: '600'
  },

  // --- DASHBOARD CARDS ---
  card: {
    backgroundColor: ADMIN_COLORS.WHITE,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.LIGHT_BROWN,
    borderBottomWidth: 4,
    elevation: 2,
    shadowColor: ADMIN_COLORS.BROWN,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expiredCard: { opacity: 0.7, backgroundColor: '#F9F9F9', borderBottomWidth: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  userEmail: { fontSize: 14, fontWeight: 'bold', color: ADMIN_COLORS.BROWN },
  subText: { fontSize: 12, color: ADMIN_COLORS.MUTED, marginTop: 4 },
  
  // Status Tags
  statusTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold', color: 'white', textTransform: 'uppercase' },

  // Admin Data Layout (ID & Code)
  adminDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  adminLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: ADMIN_COLORS.MUTED,
    width: 45,
    textTransform: 'uppercase',
  },
  adminValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ADMIN_COLORS.BROWN,
  },
  
  // Size Badge
  sizeBadge: {
    backgroundColor: ADMIN_COLORS.LIGHT_BROWN,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.MEDIUM_BROWN,
  },
  sizeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: ADMIN_COLORS.BROWN,
  },

  // --- BUTTONS ---
  // Force Release Button
  releaseBtn: { 
    marginTop: 15, 
    backgroundColor: '#FFF1F0', 
    padding: 12, 
    borderRadius: 15, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD7D7'
  },
  releaseText: { color: ADMIN_COLORS.RED, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },

  // Main Action Button (Now Brown)
  primaryBtn: { 
    backgroundColor: ADMIN_COLORS.BROWN, // Changed from Coral to Brown
    padding: 15, 
    borderRadius: 15, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#3E2723' // Darker brown for depth
  },
  btnText: { color: 'white', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },

  // --- LOCKER CONTROL SCREEN ---
  map: { 
    width: '100%', 
    height: 250, 
    borderRadius: 20, 
    marginVertical: 15, 
    borderWidth: 2, 
    borderColor: ADMIN_COLORS.MEDIUM_BROWN 
  },
  
  // Add New Hub Form
  formCard: { 
    backgroundColor: ADMIN_COLORS.WHITE, 
    padding: 20, 
    borderRadius: 25, 
    marginBottom: 20,
    borderWidth: 2,
    borderColor: ADMIN_COLORS.MEDIUM_BROWN, // Changed from Coral
    borderBottomWidth: 6
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: ADMIN_COLORS.BROWN, marginBottom: 15 },
  searchRow: { flexDirection: 'row', marginBottom: 15 },
  input: { 
    backgroundColor: ADMIN_COLORS.CREAM, 
    borderRadius: 12, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: ADMIN_COLORS.LIGHT_BROWN,
    color: ADMIN_COLORS.BROWN,
    fontWeight: '600'
  },
  searchBtn: { 
    backgroundColor: ADMIN_COLORS.MEDIUM_BROWN, // Changed from Coral
    padding: 12, 
    borderRadius: 12, 
    marginLeft: 10, 
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: ADMIN_COLORS.BROWN
  },

  // Location List Cards
  locCard: { 
    backgroundColor: ADMIN_COLORS.WHITE, 
    borderRadius: 20, 
    padding: 18, 
    marginBottom: 15,
    borderLeftWidth: 6,
    borderLeftColor: ADMIN_COLORS.MEDIUM_BROWN, // Changed from Coral accent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  locHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  locName: { fontSize: 16, fontWeight: 'bold', color: ADMIN_COLORS.BROWN, flex: 1 },
  editContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  editInput: { flex: 1, borderBottomWidth: 1, borderColor: ADMIN_COLORS.BROWN, marginRight: 10, padding: 4, fontWeight: 'bold', color: ADMIN_COLORS.BROWN },

  // Stock Rows
  adminSpaceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ADMIN_COLORS.CREAM,
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.LIGHT_BROWN,
  },
  adminSpaceText: { fontSize: 13, fontWeight: 'bold', color: ADMIN_COLORS.BROWN, textTransform: 'uppercase' },
  
  // Navigation & Headers
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { color: ADMIN_COLORS.BROWN, fontWeight: 'bold', marginLeft: 6 },
  subHeader: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: ADMIN_COLORS.MUTED, 
    textTransform: 'uppercase', 
    marginBottom: 15, 
    marginTop: 10, 
    letterSpacing: 1 
  },
  empty: { textAlign: 'center', color: ADMIN_COLORS.MUTED, marginTop: 40, fontSize: 14, fontWeight: '600' },
});