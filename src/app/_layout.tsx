import { Slot } from 'expo-router'
import '../../global.css'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@/colors/Theme'

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <Slot />
    </ThemeProvider>
  )
}