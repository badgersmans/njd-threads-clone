import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PostScreen() {
  const [text, setText] = useState('')
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
          <Pressable onPress={() => console.log('pressed...', text)} 
          className='bg-red-200 self-end rounded-full px-4 p-3'>
            <Text className='font-semibold '>Post</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}