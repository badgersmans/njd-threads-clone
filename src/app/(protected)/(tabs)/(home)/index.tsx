import PostListItem from '@/components/PostListItem'
import { fetchPosts } from '@/lib/postService'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function HomeScreen() {  
  const {data: posts, error, isLoading} = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text>{error.message}</Text>
  }

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}