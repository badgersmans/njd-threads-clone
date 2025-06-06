import { DarkTheme } from '@react-navigation/native'

export const theme = {
  ...DarkTheme,
  colors: {
      ...DarkTheme.colors,
      background: '#101010',
      card: '#101010',
      text: '#fff',
      primary: '#fff',
      secondary: '#fff',
  }
}