import { View, TouchableOpacity, Image, TextInput } from 'react-native'
import {MaterialIcons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { useState } from 'react';

export default function PostReplyInput({post}) {
  const [reply, setReply] = useState('')

  return (
    <View className='flex-row items-center mt-auto bg-neutral-700 p-2 rounded-xl gap-4 mb-5'>
      <Image source={{uri: post?.user.avatar_url}} className='w-12 aspect-square rounded-full ml-1 border-white/60 border-2'/>
      <TextInput
        placeholder='Reply to username...'
        placeholderTextColor='text-white'
        value={reply}
        onChangeText={setReply}
      />

        <View className='flex-row ml-auto gap-4'>
          <TouchableOpacity>
            <MaterialIcons name="photo" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
          <MaterialCommunityIcons name="file-gif-box" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
          <AntDesign name="pluscircleo" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
  )
}