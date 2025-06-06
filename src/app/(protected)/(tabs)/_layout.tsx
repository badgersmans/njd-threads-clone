import { router, Tabs } from 'expo-router'
import {Feather, Ionicons} from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   backgroundColor: 'red',
        // paddingTop: 10
        //   height: 200
        // }
      }}

    >
      <Tabs.Screen name="(home)" options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="search" options={{
        title: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Feather name="search" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="plus" 
        options={{
          // title: '',
          tabBarIcon: ({ color, size }) => (
            <View className='bg-neutral-700 rounded-md justify-center items-center w-9 h-9'>
              <Feather name="plus" color={color} size={size} />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push('/new')
          }
        }}
      />
      <Tabs.Screen name="notifications" options={{
        title: 'Notifications',
        tabBarIcon: ({ color, size }) => (
          <Feather name="heart" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }} />
    </Tabs>
  )
}