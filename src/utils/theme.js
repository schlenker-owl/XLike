import { configureFonts, DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DA1F2', // Twitter blue
    accent: '#1DA1F2',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#14171A', // Twitter dark gray
    placeholder: '#657786', // Twitter light gray
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF3B30', // iOS red for notifications
  },
  fonts: configureFonts(fontConfig),
  roundness: 18, // iOS tends to have slightly rounded corners
  // Twitter-specific styles
  twitter: {
    lightGray: '#AAB8C2',
    extraLightGray: '#E1E8ED',
    extraExtraLightGray: '#F5F8FA',
  },
};