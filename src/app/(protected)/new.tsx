import { useMyAuth } from '@/context/MyAuthContext'
import { createPost } from '@/lib/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import SupabaseImage from '@/components/SupabaseImage'

export default function PostScreen() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset[] | null>(null);

  const {user, profile} = useMyAuth()

  const {mutate, data, error, isPending} = useMutation({
    mutationFn: async () => {
      let imagePath = null
      if(image) {
        imagePath = await uploadImage()
      }

      return createPost({
        content: text, 
        user_id: user?.id, 
        ...(imagePath && { images: [imagePath] })
      })
    },
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

  const uploadImage = async () => {
    if (!image) {
      throw new Error('No image uri!') // Realistically, this should never happen, but just in case...
    }
    const arrayBuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

    const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
    const path = `${nanoid()}.${fileExt}`
    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(path, arrayBuffer, {
        contentType: image.mimeType ?? 'image/jpeg',
    })

    if (uploadError) {
      throw uploadError
    }
    console.log(JSON.stringify(data, null, 2))

    return data.path
  }

  const handleSelectMedia = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    // console.log(JSON.stringify(result, null, 2))

    if (!result.canceled) {
      setImage(result.assets[0]);
      // uploadImage()
    }
  }

  return (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 0}
    >
      <SafeAreaView className='p-4 flex-1'>
        <View className='flex-row gap-4'>
          <SupabaseImage 
            path={profile.avatar_url}
            styles={{width: 48}}
          />
          <View className='flex-1 gap-3'>
            <Text className='text-neutral-200'>@{profile.username}</Text>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Where is your mind?"
              multiline
              style={{fontSize: 15}}
              className='text-white'
              placeholderTextColor={'gray'}
            />

            {image && (
              <Image 
                source={{uri: image.uri}} 
                className="w-1/2 rounded-lg mt-4"
                style={{aspectRatio: image.width / image.height}}
              />
            )}

            {/* Buttons */}
            <View className='flex-row'>
              <TouchableOpacity onPress={handleSelectMedia}>
                <MaterialIcons name="photo" size={24} color="gainsboro" />
              </TouchableOpacity>
            </View>
          </View>
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