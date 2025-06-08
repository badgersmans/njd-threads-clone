import { useMyAuth } from '@/context/MyAuthContext'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { fetchProfileById } from '@/lib/profileService'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router';
import SupabaseImage from './SupabaseImage';

export default function ProfileHeader() {
  const {user} = useMyAuth()
  const router = useRouter()

  const {data: profile, isLoading, error} = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfileById(user?.id),
    staleTime: 2 * 60 * 1000
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <>
    <View className='gap-4 p-2'>

      <View className='flex-row gap-4 items-center justify-between'>
        
        <View className='gap-2'>
          <Text className='font-bold text-3xl text-neutral-200'>{profile?.full_name}</Text>
          <Text className='font-medium text-lg text-neutral-200'>@{profile?.username}</Text>
        </View>

        <SupabaseImage 
          path={profile?.avatar_url}
        />
      </View>

      <Text className='text-lg text-neutral-200 leading-snug'>{profile?.bio}</Text>

      <View className='flex-row gap-10'>
        <TouchableOpacity
          className='bg-neutral-900 flex-1 py-3 rounded-lg items-center border-neutral-700 border'
          onPress={() => router.push('/editProfile')}
        >
          <Text className='text-neutral-300'>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-neutral-900 flex-1 py-3 rounded-lg items-center border-neutral-700 border'
          onPress={() => router.push('/shareProfile')}
        >
          <Text className='text-neutral-300'>Share Profile</Text>
        </TouchableOpacity>           
      </View>
    </View>
    <Text className='text-white p-2'>Threads</Text>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 2000,
    borderWidth: 0.5,
    borderColor: 'white',
    marginLeft: 'auto'
  }
})