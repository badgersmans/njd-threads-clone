import { Tabs } from 'expo-router'
import {Feather, Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarShowLabel: false}}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
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