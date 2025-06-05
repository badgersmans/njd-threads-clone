import { useMyAuth } from '@/context/MyAuthContext'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PostScreen() {
  const [text, setText] = useState('')
  const {user} = useMyAuth()

  const onSubmit = async () => {
    if (!text || !user) return;

    const {data, error} = await supabase
    .from('posts')
    .insert({
      content: text,
      user_id: user?.id
    })

    if(error) {
      console.log(error)
    }

    setText('')
  }


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

        <View className='mt-auto'>
          <Pressable onPress={onSubmit} 
          className='bg-red-200 self-end rounded-full px-4 p-3'>
            <Text className='font-semibold '>Post</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}