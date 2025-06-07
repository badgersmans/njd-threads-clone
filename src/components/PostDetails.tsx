import { Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image as ExpoImage } from 'expo-image';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { Tables } from '@/types/database.types';
import { supabase } from '@/lib/supabase';

type PostWithUser = Tables<'posts'> & {
  user: Tables<'profiles'>
  replies: {
    count: number
  }[]
}

export default function PostDetails({post}: {post: PostWithUser}) {
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View>
      <View className="p-4">
        <Link href={`/post/${post.id}`} asChild>
          <Pressable className='flex-row'>
            <Image
              source={{ uri: post.user.avatar_url }} 
              className="w-12 aspect-square rounded-full"
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
          <ExpoImage
            key={image}
            style={{width: '100%', aspectRatio: 1, borderRadius: 20}}
            source={{
              uri: 
              supabase.storage
              .from('media')
              .getPublicUrl(image).data.publicUrl
          }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
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