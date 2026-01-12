import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const PASTEL_THEME = {
  background: '#FFF9F5',
  primary: '#FFB7B2',
  text: '#5D4037',
  white: '#FFFFFF',
  overlay: 'rgba(255, 253, 250, 0.5)', 
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PASTEL_THEME.overlay,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20,
    paddingTop: 60, 
  },
  // --- THE NEW POP-UP BOX ---
  loginBox: {
    width: '100%',
    backgroundColor: '#d7cebeff', 
    borderWidth: 4,
    borderColor: PASTEL_THEME.text,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 12,
    elevation: 10,
  },
  pixelHeader: { 
    fontFamily: 'PixelGame',
    fontSize: 28, 
    color: PASTEL_THEME.text, 
    textAlign: 'center',
    marginBottom: 20,
    // Original Logic Fixes
    includeFontPadding: false,
    textAlignVertical: 'center',
    minHeight: 40,
    paddingBottom: 5,
  },
  input: { 
    width: '100%', 
    backgroundColor: '#f0eae0ff', 
    borderWidth: 3, 
    borderColor: PASTEL_THEME.text, 
    borderRadius: 15,
    padding: 15, 
    marginBottom: 15, 
    color: PASTEL_THEME.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainBtn: { 
    backgroundColor: PASTEL_THEME.primary, 
    padding: 18, 
    borderRadius: 20, 
    width: '100%', 
    alignItems: 'center',
    borderWidth: 3,
    borderColor: PASTEL_THEME.text,
    borderBottomWidth: 8, 
  },
  pixelBtnText: { 
    fontFamily: 'PixelGame', 
    color: PASTEL_THEME.white, 
    fontSize: 18 
  },
  linkText: { 
    marginTop: 15, 
    color: PASTEL_THEME.text, 
    fontWeight: 'bold', 
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 'auto', 
    paddingBottom: 20,
    justifyContent: 'center',
  },
  footerLogo: {
    width: 120,
    height: 60,
    opacity: 0.8,
  },
  disabledBtn: {
    backgroundColor: '#BDC3C7',
    borderBottomWidth: 3,
  }
});

export default styles;