import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  mainWrapper: { flex: 1 },
  backgroundImage: { position: 'absolute', left: 0, top: 0, zIndex: -1 },
  scrollContainer: { paddingHorizontal: 15, paddingTop: 50, paddingBottom: 100, alignItems: 'center' },

  signageBox: {
    backgroundColor: '#F9F1E7', // Map Landscape Cream
    borderWidth: 3,
    borderColor: '#4E342E', // Map Label Brown
    borderRadius: 20,
    padding: 12,
    width: '95%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  addressText: { fontSize: 10, fontFamily: 'PixelGame', color: '#4E342E', textAlign: 'center' },

  uiPlaque: {
    backgroundColor: '#4E342E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 35,
  },
  pixelHeaderText: { fontSize: 12, color: '#FFFFFF', fontFamily: 'PixelGame' },

  lockerGrid: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },

  lockerBox: {
    width: '31%', 
    height: 240, 
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#4E342E',
    borderBottomWidth: 10,
    paddingTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  lockerVent: {
    width: '40%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: 6,
  },

  lockerContent: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 4,
  },

  lockerText: {
    fontFamily: 'PixelGame',
    fontSize: 15, 
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 80
  },

  statusText: {
    fontFamily: 'PixelGame',
    fontSize: 10, 
    textAlign: 'center',
    lineHeight: 10,
    textTransform: 'uppercase',
  },

  lockerHandle: {
    position: 'absolute',
    right: 6,
    top: '45%',
    width: 8,
    height: 30,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4E342E',
  },

  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F1E7' },
});