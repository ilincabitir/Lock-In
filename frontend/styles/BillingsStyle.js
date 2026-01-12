import { StyleSheet } from 'react-native';

export const BILLING_COLORS = {
  CREAM: '#FFF9F5',
  BROWN: '#5D4037',
  CORAL: '#FFB7B2',
  WHITE: '#FFFFFF',
  GREEN: '#2ECC71'
};

export default StyleSheet.create({
  // --- UNIVERSAL LAYOUT ---
  container: { 
    flex: 1, 
    backgroundColor: BILLING_COLORS.CREAM,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    width: '100%',
  },

  // --- TYPOGRAPHY (Selective Pixelation) ---
  pixelHeader: {
    fontSize: 20, // Bigger writing
    color: BILLING_COLORS.BROWN,
    fontFamily: 'PixelGame', 
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 10,
  },
  pixelCode: {
    fontSize: 32,
    color: BILLING_COLORS.BROWN,
    fontFamily: 'PixelGame',
    marginVertical: 15,
    textAlign: 'center',
  },
  priceValue: {
    fontSize: 32,
    color: BILLING_COLORS.GREEN,
    fontFamily: 'PixelGame',
    marginTop: 5,
  },
  standardText: {
    fontSize: 14,
    color: '#8E735B',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: { 
    fontSize: 12, 
    fontWeight: '900', 
    color: '#A08679', 
    letterSpacing: 1,
    marginBottom: 5,
    textTransform: 'uppercase'
  },

  // --- CARDS (Locker Aesthetic) ---
  infoCard: {
    backgroundColor: BILLING_COLORS.WHITE,
    padding: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: BILLING_COLORS.BROWN,
    borderBottomWidth: 10, // Depth
    marginBottom: 25,
  },
  receiptCard: {
    backgroundColor: BILLING_COLORS.WHITE,
    borderRadius: 25,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: BILLING_COLORS.BROWN,
    borderBottomWidth: 10,
    marginTop: 40,
    position: 'relative', // For the floating icon
  },

  // --- PAYMENT SPECIFIC ---
  hoursGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    marginBottom: 20 
  },
  hourBtn: { 
    width: 55, 
    height: 55, 
    backgroundColor: BILLING_COLORS.WHITE, 
    margin: 6, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 3,
    borderColor: BILLING_COLORS.BROWN,
    borderBottomWidth: 5,
  },
  selectedBtn: { 
    backgroundColor: BILLING_COLORS.BROWN,
    borderColor: BILLING_COLORS.BROWN,
  },
  hourText: { fontSize: 16, fontWeight: 'bold', color: BILLING_COLORS.BROWN },
  selectedText: { color: BILLING_COLORS.WHITE },
  
  priceContainer: { 
    alignItems: 'center', 
    marginBottom: 25,
    backgroundColor: 'rgba(93, 64, 55, 0.05)',
    padding: 15,
    borderRadius: 20,
    width: '100%'
  },

  // --- RECEIPT SPECIFIC ---
  iconCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -42,
    borderWidth: 4,
    borderColor: BILLING_COLORS.BROWN,
    backgroundColor: BILLING_COLORS.WHITE,
    zIndex: 10,
  },
  dashLine: {
    width: '100%',
    height: 4,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#D7CCC8',
    marginVertical: 15,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  item: { alignItems: 'center', flex: 1 },
  value: { fontSize: 15, fontWeight: 'bold', color: BILLING_COLORS.BROWN, marginTop: 5 },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFBF2',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BILLING_COLORS.BROWN
  },
  warningText: { fontSize: 11, color: '#8E735B', marginLeft: 8, fontWeight: 'bold' },

  // --- BUTTONS & LINKS ---
  payButton: { 
    backgroundColor: BILLING_COLORS.CORAL, 
    padding: 18, 
    borderRadius: 20, 
    width: '100%', 
    alignItems: 'center',
    borderWidth: 4,
    borderColor: BILLING_COLORS.BROWN,
    borderBottomWidth: 8,
  },
  payText: { color: BILLING_COLORS.WHITE, fontSize: 18, fontWeight: 'bold', fontFamily: 'PixelGame' },
  cancelLink: { marginTop: 20, padding: 5 },
  cancelText: { 
    color: BILLING_COLORS.BROWN, 
    textDecorationLine: 'underline', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  pdfBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  pdfBtnText: { color: BILLING_COLORS.BROWN, fontWeight: 'bold', marginLeft: 8, fontSize: 12, textDecorationLine: 'underline' },
  disabledBtn: { backgroundColor: '#BDC3C7', borderBottomColor: '#95A5A6' },
});