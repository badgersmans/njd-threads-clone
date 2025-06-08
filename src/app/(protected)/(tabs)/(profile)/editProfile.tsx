import UserAvatarPicker from '@/components/UserAvatarPicker'
import { useMyAuth } from '@/context/MyAuthContext'
import { fetchProfileById, updateUserProfile } from '@/lib/profileService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'

export default function ProfileEdit() {
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const {user, logout} = useMyAuth()
  const queryClient = useQueryClient()

  const {data: profile, isLoading, isSuccess, error} = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfileById(user?.id),
  })

  const {mutate, data, error: updateError, isPending} = useMutation({
    mutationFn: () => updateUserProfile({
      id: user?.id,
      full_name: fullName,
      bio,
      avatar_url: avatarUrl
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile', user?.id]})
      router.back()
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text className='text-red-300'>Error: {error.message}</Text>
  }

  useEffect(() => {
    if(isSuccess) {
      setFullName(profile.full_name)
      setBio(profile.bio)
      setAvatarUrl(profile.avatar_url)
    }
  }, [profile?.id])

  return (
    <View className='flex-1 p-3 gap-4'>

      <Text className='text-white text-2xl font-bold'>Edit Profile</Text>
      <UserAvatarPicker currentAvatar={avatarUrl} onUpload={setAvatarUrl}/>
      <TextInput 
        placeholder='Full name'
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor={'#737373'}
        style={{color: 'white', fontSize: 18}}
        className='border border-neutral-600 p-1 rounded-md'
      />
      <TextInput
        placeholder='Bio'
        value={bio}
        onChangeText={setBio}
        placeholderTextColor={'#737373'}
        style={{color: 'white', fontSize: 18}}
        className='border border-neutral-600 p-1 rounded-md leading-tight'
        multiline
      />

        <View className='mt-auto gap-5'>
          {/* Save Profile Button */}
          <TouchableOpacity
            onPress={() => mutate()}
            className={`
            bg-neutral-100
            items-center
            py-3
            rounded-lg
            border-neutral-700 border
            ${isPending ? 'opacity-50' : ''}
            `}
            disabled={isPending}
          >
            <Text className='text-neutral-900 font-semibold text-lg'>Save</Text>
          </TouchableOpacity>

          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={logout}
            className='
            bg-neutral-900
            items-center
            py-3
            rounded-lg
            border-neutral-700 border
            '
          >
            <Text className='text-white font-semibold text-lg'>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}