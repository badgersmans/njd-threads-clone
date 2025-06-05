import PostListItem from '@/components/PostListItem'
import { dummyPosts } from '@/dummyData'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const {data, error} = await supabase.from('posts').select('*, user:profiles(*)')

      if(error) {
        console.log(error)
      }
      setPosts(data)
    }

    fetchPosts()
  }, [])

  console.log(JSON.stringify(posts, null, 2))

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <Link href={'/new'} className='text-red-300'>
          New Post
        </Link>
      )}
    />
  )
}