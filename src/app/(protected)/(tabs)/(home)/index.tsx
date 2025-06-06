import PostListItem from '@/components/PostListItem'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function HomeScreen() {  
  const fetchPosts = async () => {
    const {data, error} = await supabase
    .from('posts')
    .select('*, user:profiles(*)')
    .order('created_at', { ascending: false })
    .throwOnError()

    // console.log(JSON.stringify(data, null, 2))
    return data;
  }

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