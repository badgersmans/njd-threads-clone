import { Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { Link, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { Tables } from '@/types/database.types';

type PostWithUser = Tables<'posts'> & {
  user: Tables<'profiles'>
  replies: {
    count: number
  }[]
}

export default function PostListItem({post, isLastInGroup = true}: {post: PostWithUser, isLastInGroup: boolean}) {
  const router = useRouter()
  return (
    <View className={`p-4 ${isLastInGroup ? `border-b border-gray-800/80` : ``} `} >
      <Pressable 
        className='gap-5 flex-row' 
        onPress={() => router.push(`/post/${post.id}`)}
      >
        {/* Avatar + Vertical Line */}
        <View className='items-center'>
          <Image
            source={{ uri: post.user.avatar_url }} 
            className="w-12 aspect-square rounded-full"
          />
          {!isLastInGroup && <View className='absolute top-14 w-[3px] rounded-full h-20 bg-neutral-700' />}
        </View>

        {/* Post Body */}
        <View className='gap-4'>
          <View className='flex-row gap-2'>
            <Text className="text-white font-bold">{post.user.username}</Text>
            <Text className="text-gray-500">
              {dayjs(post.created_at).fromNow()}
            </Text>
          </View>

          <Text className="text-white leading-5">{post.content}</Text>
        </View>
      </Pressable>

      {/* Footer */}
      <View className="flex-row mt-3 gap-4 ml-16">
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