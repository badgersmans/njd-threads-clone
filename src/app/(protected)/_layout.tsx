import { Stack } from 'expo-router'

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name='new' options={{
        presentation: 'modal'
      }}/>
    </Stack>
  )
}