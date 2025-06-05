import { Slot } from 'expo-router'
import '../../global.css'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@/colors/Theme'
import { AuthProvider } from '@/context/MyAuthContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSyncQueriesExternal } from "react-query-external-sync";
import { Platform } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { MMKV } from 'react-native-mmkv'
// export const storage = new MMKV()

export default function RootLayout() {
  return (
    <AppContent />
  )
}

function AppContent() {
  const queryClient = new QueryClient();

  // Set up the sync hook - automatically disabled in production!
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831", // Default port for React Native DevTools
    deviceName: Platform?.OS || "web", // Platform detection
    platform: Platform?.OS || "web", // Use appropriate platform identifier
    deviceId: Platform?.OS || "web", // Use a PERSISTENT identifier (see note below)
    extraDeviceInfo: {
      // Optional additional info about your device
      appVersion: "1.0.0",
      // Add any relevant platform info
    },
    enableLogs: true,
    // envVariables: {
    //   NODE_ENV: process.env.NODE_ENV,
    //   // Add any private environment variables you want to monitor
    //   // Public environment variables are automatically loaded
    // },
    // Storage monitoring with CRUD operations
    // mmkvStorage: storage, // MMKV storage for ['#storage', 'mmkv', 'key'] queries + monitoring
    asyncStorage: AsyncStorage, // AsyncStorage for ['#storage', 'async', 'key'] queries + monitoring
    // secureStorage: SecureStore, // SecureStore for ['#storage', 'secure', 'key'] queries + monitoring
    // secureStorageKeys: [
    //   "userToken",
    //   "refreshToken",
    //   "biometricKey",
    //   "deviceId",
    // ], // SecureStore keys to monitor
  });

  // Your app content
  return (
    <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="auto" />
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
  </ThemeProvider>
  )
}