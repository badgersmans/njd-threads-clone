import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router/build/hooks'

export default function ThreadDetails() {
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Text className='text-white'>Thread id: {id}</Text>
    </View>
  )
}