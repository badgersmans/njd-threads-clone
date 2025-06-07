import { useMyAuth } from '@/context/MyAuthContext'
import { View, Text, Pressable, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { fetchProfileById } from '@/lib/profileService'
import { useQuery } from '@tanstack/react-query'
import { Image as ExpoImage } from 'expo-image';

export default function ProfileHeader() {
  const {user, logout} = useMyAuth()
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const {data: profile, isLoading, error} = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => fetchProfileById(user?.id)
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

      <View className='flex-row gap-4 items-center '>
        
        <View className='gap-2'>
          <Text className='font-bold text-3xl text-neutral-200'>{profile?.full_name}</Text>
          <Text className='font-medium text-lg text-neutral-200'>@{profile?.username}</Text>
        </View>

        <ExpoImage
          key={profile?.id}
          style={styles.image}
          source={{uri: profile?.avatar_url }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>

      <Text className='text-lg text-neutral-200 leading-snug'>{profile?.bio}</Text>

      <View className='flex-row gap-10'>
        <TouchableOpacity className='bg-neutral-900 flex-1 py-3 rounded-lg items-center border-neutral-700 border'>
          <Text className='text-neutral-300'>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity className='bg-neutral-900 flex-1 py-3 rounded-lg items-center border-neutral-700 border'>
          <Text className='text-neutral-300'>Share Profile</Text>
        </TouchableOpacity>           
      </View>


      {/* <Pressable onPress={logout}>
        <Text className='text-white'>Sign Out</Text>
      </Pressable> */}
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