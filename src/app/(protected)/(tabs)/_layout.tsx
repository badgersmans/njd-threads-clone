import { Tabs } from 'expo-router'
import {Feather, Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarShowLabel: false}}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="search" options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="search" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="notifications" options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="heart" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }} />
    </Tabs>
  )
}