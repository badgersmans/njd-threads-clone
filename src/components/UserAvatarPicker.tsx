import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useMyAuth } from '@/context/MyAuthContext'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import { supabase } from '@/lib/supabase'
import SupabaseImage from './SupabaseImage'

type UserAvatarPickerProps = {
  currentAvatar: string,
  onUpload: () => void
}

export default function UserAvatarPicker({currentAvatar, onUpload}: UserAvatarPickerProps) {
  const {user} = useMyAuth()

  const uploadImage = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
      exif: false
    });

    // console.log(JSON.stringify(result, null, 2))
    if(result.canceled || !result.assets || result.assets.length === 0) {
      console.log('User cancelled image picker')
      return
    }

    const image = result.assets[0];
    console.log('Got image', image)

    if (!image) {
      throw new Error('No image uri!') // Realistically, this should never happen, but just in case...
    }
    const arrayBuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

    const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
    const path = `${nanoid()}.${fileExt}`
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, arrayBuffer, {
        contentType: image.mimeType ?? 'image/jpeg',
    })

    if (uploadError) {
      throw uploadError
    }

    console.log(data.path)
    onUpload(data.path)
  }

  return (
    <View className='my-3'>
      <TouchableOpacity className='self-center items-center' onPress={uploadImage}>
        <SupabaseImage path={currentAvatar} />
        <Text className='text-neutral-900 font-semibold absolute bottom-[-5] bg-neutral-100 px-2 py-1 rounded'>Edit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 2000,
    borderWidth: 0.5,
    borderColor: 'white',
  }
})