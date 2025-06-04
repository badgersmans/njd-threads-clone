import { View, Text } from 'react-native'
import { useSearchParams } from 'expo-router/build/hooks'

export default function ThreadDetails() {
  const {id} = useSearchParams()
  return (
    <View>
      <Text>Thread id: {id}</Text>
    </View>
  )
}