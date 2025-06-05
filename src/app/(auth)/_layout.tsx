import { useMyAuth } from '@/context/MyAuthContext'
import { Redirect, Stack } from 'expo-router'

export default function AuthLayout() {
  const {isAuthenticated} = useMyAuth()
  if(isAuthenticated) {
    return <Redirect href={'/(protected)'} />
  }

  return (
    <Stack screenOptions={{headerShown: false}}/>
  )
}