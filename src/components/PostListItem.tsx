import { Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Post } from '@/types'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function PostListItem({post}: {post: Post}) {
  return (
    <Link href={`/${post.id}`} asChild>
      <Pressable className="flex-row p-4 border-b border-gray-800/80">
        <Image
          source={{ uri: post.user.image }} 
          className="w-12 aspect-square rounded-full"
        />

        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className="text-white font-bold">{post.user.username}</Text>
            <Text className="text-gray-500 ml-2">
              {dayjs(post.createdAt).fromNow()}
            </Text>
          </View>

          <Text className="text-white mt-2 leading-5">{post.content}</Text>
          
          {post.parent && (
            <View className="mt-2 bg-gray-800/50 p-3 rounded-lg">
              <View className="flex-row items-center">
                <Text className="text-gray-300">{post.parent.user.name}</Text>
                <Text className="text-gray-300 ml-2">·</Text>
                <Text className="text-gray-300 ml-2">
                  {new Date(post.parent.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-gray-300 mt-1">{post.parent.content}</Text>
            </View>
          )}

          <View className="flex-row items-center mt-3 gap-4">
            <View className='flex-row items-center gap-1'>
              <Ionicons name="heart-outline" size={24} color={"#d1d5db"}/>
              <Text className="text-gray-300">{post.replies.length}</Text>
            </View>

            <View className='flex-row items-center gap-1'>
              <Ionicons name="chatbubble-outline" size={24} color={"#d1d5db"}/>
              <Text className="text-gray-300">{post.replies.length}</Text>
            </View>

            <Ionicons name="repeat-outline" size={24} color={"#d1d5db"}/>
            <Ionicons name="paper-plane-outline" size={24} color={"#d1d5db"}/>

          </View>
        </View>
      </Pressable>
    </Link>
  )
}