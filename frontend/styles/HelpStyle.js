import { StyleSheet } from 'react-native';

const MAP_THEME = {
  landscape: '#F9F1E7',
  road: '#FFFFFF',
  highway: '#FFCCBC', 
  text: '#4E342E',    
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAP_THEME.landscape,
  },
  header: {
    backgroundColor: MAP_THEME.road,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: MAP_THEME.text,
  },
  pixelHeader: { 
    fontFamily: 'PixelGame',
    fontSize: 20, // Bigger header
    color: MAP_THEME.text, 
    includeFontPadding: false,
    marginLeft: 15,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  mascotHelperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 5, 
    zIndex: 5,
  },
  helperMascotImg: {
    width: 100,
    height: 100,
  },
  helperBubble: {
    backgroundColor: '#ddaea0ff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    marginBottom: 55,
    borderWidth: 2,
    borderColor: MAP_THEME.highway,
  
  },
  section: {
    marginBottom: 50, // More separation
  },
  card: {
    backgroundColor: MAP_THEME.road,
    borderRadius: 22,
    padding: 24,
    borderWidth: 3,
    borderColor: MAP_THEME.text,
    borderBottomWidth: 10, // Chunkier shadow
  },
  // Locker Diagram Styles
  diagramContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: MAP_THEME.landscape,
  },
  lockerBox: {
    borderWidth: 3,
    borderColor: MAP_THEME.text,
    backgroundColor: MAP_THEME.highway,
    alignItems: 'center',
    justifyContent: 'center',
  },
  measureText: {
    fontFamily: 'PixelGame',
    fontSize: 10, // Bigger pixel text
    color: MAP_THEME.text,
    marginTop: 6,
  },
  // Typography Upgrades
  itemTitle: {
    fontSize: 20, // Bigger titles
    fontWeight: '800',
    color: MAP_THEME.text,
    marginBottom: 15,
  },
  sentenceBox: {
    borderLeftWidth: 4,
    borderLeftColor: MAP_THEME.highway,
    paddingLeft: 15,
    marginBottom: 15,
  },
  itemDesc: {
    fontSize: 16, // Bigger body writing
    color: '#5D4037',
    lineHeight: 24,
  },
  // Contact Footer
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MAP_THEME.road,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: MAP_THEME.text,
    marginBottom: 20,
  },
  emailText: {
    fontFamily: 'PixelGame',
    fontSize: 12,
    color: MAP_THEME.text,
    marginLeft: 10,
    includeFontPadding: false,
  },
  footerLogo: {
    width: 120,
    height: 60,
    opacity: 0.4,
  },
  // Add these to your existing styles file
  featureBadge: {
    backgroundColor: '#E0EAE2', // Sage Green from the Map
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4E342E',
  },
  pixelBadgeText: {
    fontFamily: 'PixelGame',
    fontSize: 10,
    color: '#4E342E',
    includeFontPadding: false,
  },
  aboutParagraph: {
    fontSize: 16,
    color: '#5D4037',
    lineHeight: 24,
    marginBottom: 20,
  },
  securityFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  iconSquare: {
    width: 44,
    height: 44,
    backgroundColor: '#FFCCBC', // Map Peach/Coral
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#4E342E',
    justifyContent: 'center',
    alignItems: 'center',
    // Chunky shadow effect
    borderBottomWidth: 4,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 2,
  },
  featureSub: {
    fontSize: 13,
    color: '#7D6A65',
    lineHeight: 18,
  },
  dimensionSubText: {
    fontSize: 10,
    color: '#8D6E63',
    marginTop: 2,
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 15,
    color: '#5D4037',
    lineHeight: 22,
    marginBottom: 5,
  }
});