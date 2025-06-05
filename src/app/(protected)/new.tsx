import { useMyAuth } from '@/context/MyAuthContext'
import { supabase } from '@/lib/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PostScreen() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')
  const {user} = useMyAuth()

  const createPost = async () => {
    if (!text || !user) return;

    const {data} = await supabase
    .from('posts')
    .insert({content: text, user_id: user?.id})
    .throwOnError()
    .select('*')

    return data
  }

  const {mutate, data, error, isPending} = useMutation({
    mutationFn: () => createPost(),
    onSuccess: (data) => {
      setText('')
      router.back()
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.log(error.message)
      // Alert.alert('Error', error.message)
    },
  })

  return (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
    >
      <SafeAreaView className='p-4 flex-1'>
        <Text className='text-green-200'>username...</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What's on your mind?"
          multiline
          className='text-white text-lg'
          placeholderTextColor={'gray'}
          numberOfLines={4}
        />

        {error && <Text className='text-red-400 text-sm mt-4'>{error.message}</Text>}

        <View className='mt-auto'>
          <Pressable 
            onPress={() => mutate()} 
            className={`${isPending ? 'bg-white/50' : 'bg-white'} self-end rounded-full px-4 p-3`}
            disabled={isPending}
          >
            <Text className='font-semibold '>Post</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}