import { Text, View, Pressable, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { Tables } from '@/types/database.types';
import SupabaseImage from './SupabaseImage';

type PostWithUser = Tables<'posts'> & {
  user: Tables<'profiles'>
  replies: {
    count: number
  }[]
}

export default function PostDetails({post}: {post: PostWithUser}) {

  return (
    <View>
      <View className="p-4">
        <Link href={`/post/${post.id}`} asChild>
          <Pressable className='flex-row'>
            <SupabaseImage 
              path={post.user.avatar_url}
              styles={{width: 48, aspectRatio: 1, borderRadius: 2000}}
            />

            <View className="flex-1 ml-3 justify-center">
              <View className="flex-row items-center">
                <Text className="text-white font-bold">{post.user.username}</Text>
                <Text className="text-gray-500 ml-2">
                  {dayjs(post.created_at).fromNow()}
                </Text>
              </View>
            </View>
          </Pressable>
        </Link>
      </View>

      <Text className="text-white leading-5 ml-5">{post.content}</Text>

      {post.images && post.images.map((image) => (
        <View className='m-3'>
        <SupabaseImage
          key={image}
          path={image}
          bucket='media'
          styles={{width: '100%', aspectRatio: 1, borderRadius: 20, borderWidth: 0}}
        />
        </View>
      ))}

      {/* Footer */}
      <View className="flex-row items-center mt-3 gap-6 ml-5">

        <TouchableOpacity className='flex-row items-center gap-1'>
          <Ionicons name="heart-outline" size={21} color={"#d1d5db"}/>
          <Text className="text-gray-300">{0}</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center gap-1'>
          <Ionicons name="chatbubble-outline" size={21} color={"#d1d5db"}/>
          <Text className="text-gray-300">{post.replies?.[0].count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="repeat-outline" size={21} color={"#d1d5db"}/>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={21} color={"#d1d5db"}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}