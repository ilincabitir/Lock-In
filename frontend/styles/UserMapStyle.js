import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 50,
  },
  customPinIcon: {
    width: 40, 
    height: 40, 
  },
  recenterBtn: {
    position: 'absolute',
    bottom: 110, 
    right: 20,
    backgroundColor: '#FFFFFF',
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  helpBtn: {
    position: 'absolute',
    top: 50, 
    left: 20, // MOVED TO THE OTHER SIDE
    backgroundColor: '#FFFFFF',
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
});