
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aebb5a568b7b4b978d664decae57f9d2',
  appName: 'flor-de-lavanda-medita',
  webDir: 'dist',
  server: {
    url: 'https://aebb5a56-8b7b-4b97-8d66-4decae57f9d2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#FFFFFF'
  }
};

export default config;
