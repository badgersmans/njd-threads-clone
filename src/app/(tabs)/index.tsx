import PostListItem from '@/components/PostListItem'
import { dummyPosts } from '@/dummyData'
import { FlatList } from 'react-native'

export default function HomeScreen() {
  return (
    <FlatList 
      data={dummyPosts}
      renderItem={({item}) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}