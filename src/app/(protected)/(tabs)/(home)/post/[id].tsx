import { View, Text, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchPostById } from '@/lib/PostService'
import PostListItem from '@/components/PostListItem'
import PostReplyInput from '@/components/PostReplyInput'

export default function ThreadDetails() {
  const {id} = useLocalSearchParams<{id: string}>()
  const {data: post, error, isLoading} = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id)
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text className='text-red-300'>{error.message}</Text>
  }

  return (
    <View className='flex-1'>
      <PostListItem post={post}/>

      <PostReplyInput post={post}/>
    </View>
  )
}