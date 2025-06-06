import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchPostById, fetchPostReplies } from '@/lib/postService'
import PostListItem from '@/components/PostListItem'
import PostReplyInput from '@/components/PostReplyInput'
import PostDetails from '@/components/PostDetails'

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
        ListHeaderComponent={
          <>
            <PostDetails post={post} />
            <Text className='text-white text-lg font-bold p-4 border-b border-neutral-700'>Replies</Text>
          </>
        }
      />

      <PostReplyInput post={post} />
    </View>
  )
}