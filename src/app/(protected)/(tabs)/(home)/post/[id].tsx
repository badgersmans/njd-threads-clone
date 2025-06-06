import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchPostById, fetchPostReplies } from '@/lib/postService'
import PostListItem from '@/components/PostListItem'
import PostReplyInput from '@/components/PostReplyInput'

export default function ThreadDetails() {
  const {id} = useLocalSearchParams<{id: string}>()
  const {data: post, error, isLoading} = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id)
  })
  const {data: replies, error: replyError, isLoading: replyLoading} = useQuery({
    queryKey: ['posts', id, 'replies'],
    queryFn: () => fetchPostReplies(id)
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text className='text-red-300'>{error.message}</Text>
  }

  return (
    <View className='flex-1'>
      <FlatList 
        data={replies || []}
        renderItem={({item}) => (
          <PostListItem post={item}/>
        )}
        ListHeaderComponent={() => <PostListItem post={post} />}
      />

      <PostReplyInput post={post} />
    </View>
  )
}