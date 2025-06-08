import { Stack } from 'expo-router'

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: 'Profile'}} />

      <Stack.Screen name='editProfile' 
        options={{title: 'Edit Profile', 
        headerBackButtonDisplayMode: 'minimal'}}
      />
      <Stack.Screen name='shareProfile' 
        options={{title: 'Share Profile', 
        headerBackButtonDisplayMode: 'minimal'}}
      />
    </Stack>
  )
}