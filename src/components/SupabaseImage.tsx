import { Text, Image, ActivityIndicator, StyleSheet, ImageStyle } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Image as ExpoImage } from 'expo-image';

type SupabaseImageProps = {
  bucket?: string,
  path: string,
  styles?: ImageStyle
}

const downloadImage = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage.from(bucket).download(path)
  if (error) {
    throw error
  }

  const base64 = await new Promise<string>((resolve, reject) => {
    const fr = new FileReader()
    fr.readAsDataURL(data)
    fr.onload = () => {
      resolve(fr.result as string);
    }
    fr.onerror = () => reject(new Error("Failed to read file as Data URL"));
  })
  // console.log(`base64? ${base64}`)
  return base64;
}

export default function SupabaseImage({bucket = 'avatars', path, styles}: SupabaseImageProps) {
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
  const {data, error, isLoading} = useQuery({
    queryKey: ['supabaseImage', path],
    queryFn: () => downloadImage(bucket, path)
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text className='text-red-300'>Error: {error.message}</Text>
  }

  // console.log(JSON.stringify(data, null, 2))

  return (
  // <Image 
  //   source={{
  //     uri: data
  //   }}
  //   style={[imageStyles.image, styles]}
  //  />

   <ExpoImage
    key={data}
    style={[imageStyles.image, styles]}
    source={{uri: data}}
    placeholder={{ blurhash }}
    contentFit="cover"
    transition={1000}
  />
  )
}

const imageStyles = StyleSheet.create({
  image: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 2000,
    borderWidth: 0.5,
    borderColor: 'white',
  }
})