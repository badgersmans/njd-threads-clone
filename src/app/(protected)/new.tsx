import { useMyAuth } from '@/context/MyAuthContext'
import { createPost } from '@/lib/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import { supabase } from '@/lib/supabase'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

export default function PostScreen() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')
  const [image, setImage] = useState<string | null>(null);

  const {user} = useMyAuth()

  const {mutate, data, error, isPending} = useMutation({
    mutationFn: () => createPost({content: text, user_id: user?.id}),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setText('')
      router.back()
    },
    onError: (error) => {
      console.log(error.message)
      // Alert.alert('Error', error.message)
    },
  })

  const handleSelectMedia = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    const asset = result.assets[0];
    const base64Image = asset.base64; // ✅ the raw base64 string
    const base64Str = base64Image
    const arrayBuffer = decode(base64Str); // ✅ Convert base64 → binary

    const fileName = `${nanoid()}.jpg`; // or .png depending on what you pick
    const contentType = 'image/jpeg'; // or 'image/png'

    const { data, error } = await supabase
      .storage
      .from('media')
      .upload(`${fileName}`, arrayBuffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Upload failed:', error);
    } else {
      console.log('Upload success:', data);
    }


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
        />

        {image && (
          <Image source={{uri: image}} className="w-1/2 aspect-square rounded-lg mt-4" />
        )}

        {/* Buttons */}
        <View className='flex-row mt-5'>
          <TouchableOpacity onPress={handleSelectMedia}>
            <MaterialIcons name="photo" size={24} color="gainsboro" />
          </TouchableOpacity>
        </View>

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