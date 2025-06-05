import PostListItem from '@/components/PostListItem'
import { dummyPosts } from '@/dummyData'
import { Link } from 'expo-router'
import { FlatList, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({item}) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <Link href={'/new'} className='text-red-300'>
            New Post
          </Link>

          <Link href={'/login'} className='text-red-300'>
            Login
          </Link>
        </>
      )}
    />
  )
}