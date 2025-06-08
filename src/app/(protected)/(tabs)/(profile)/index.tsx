import PostListItem from '@/components/PostListItem'
import ProfileHeader from '@/components/ProfileHeader'
import { useMyAuth } from '@/context/MyAuthContext'
import { fetchPostsByUserId } from '@/lib/postService'
import { useQuery } from '@tanstack/react-query'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'

export default function ProfileScreen() {
  const {user} = useMyAuth()

  const {data, isLoading, error} = useQuery({
    queryKey: ['posts', {user_id: user?.id}],
    queryFn: () => fetchPostsByUserId(user?.id)
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <PostListItem post={item}/>
        )}
        ListHeaderComponent={() => (
          <ProfileHeader />
        )}
      />
    </View>
  )
}