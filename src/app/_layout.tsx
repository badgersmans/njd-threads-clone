import { Slot } from 'expo-router'
import '../../global.css'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@/colors/Theme'
import { AuthProvider } from '@/context/MyAuthContext'

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  )
}