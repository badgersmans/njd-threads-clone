import { useMyAuth } from '@/context/MyAuthContext'
import { View, Text, Pressable } from 'react-native'

export default function ProfileScreen() {
  const {logout} = useMyAuth()
  return (
    <Pressable onPress={logout}>
      <Text className='text-white'>Sign Out</Text>
    </Pressable>
  )
}