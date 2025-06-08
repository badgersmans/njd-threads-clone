import { View, TouchableOpacity, Image, TextInput } from 'react-native'
import {MaterialIcons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/postService';
import { Tables } from '@/types/database.types';
import { useMyAuth } from '@/context/MyAuthContext';
import { fetchProfileById } from '@/lib/profileService';

type PostWithuser = Tables<'posts'> & {
  post: Tables<'posts'>
  user: Tables<'profiles'>
}

export default function PostReplyInput({post}: PostWithuser ) {
  const [reply, setReply] = useState('')
  const {user} = useMyAuth()
  const queryClient = useQueryClient()

  const {data: profile, isLoading, isSuccess, error: profileError} = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfileById(user?.id),
  })

  const {mutate, data, error, isPending} = useMutation({
    mutationFn: () => createPost({content: reply, user_id: user?.id, parent_id: post.id}),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setReply('')
    },
    onError: (error) => {
      console.log(error.message)
      // Alert.alert('Error', error.message)
    },
  })

  return (
    <View className='flex-row items-center mt-auto bg-neutral-700 p-2 rounded-xl gap-4 mb-5'>
      <Image source={{uri: profile?.avatar_url}} className='w-12 aspect-square rounded-full ml-1 border-white/60 border-2'/>
      <TextInput
        placeholder='Add to Thread'
        placeholderTextColor='text-white'
        className='text-white flex-1'
        multiline
        value={reply}
        onChangeText={setReply}
      />

        <View className='flex-row ml-auto gap-4'>
          <TouchableOpacity>
            <MaterialIcons name="photo" size={28} color="gainsboro" />
          </TouchableOpacity>

          <TouchableOpacity>
          <MaterialCommunityIcons name="file-gif-box" size={28} color="gainsboro" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => mutate()} 
            disabled={isPending || reply.length === 0}
          >
          <AntDesign name="pluscircleo" size={28} color={reply.length === 0 ? 'grey' : 'gainsboro'} />
          </TouchableOpacity>
        </View>
      </View>
  )
}