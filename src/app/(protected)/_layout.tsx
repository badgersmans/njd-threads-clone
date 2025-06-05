import { useMyAuth } from '@/context/MyAuthContext'
import { Redirect, Stack } from 'expo-router'

export default function ProtectedLayout() {
  const {isAuthenticated} = useMyAuth()

  if(!isAuthenticated) {
    return <Redirect href={'/login'} />
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{headerShown: false}} />
      <Stack.Screen name='new' options={{
        title: 'New Thread',
        presentation: 'modal',
      }}/>
    </Stack>
  )
}