import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt with:', { email, password });
  };

  return (
    <View className="flex-1 bg-neutral-900 p-6 justify-center">
      <View className="gap-4">
        <View>
          <Text className="text-3xl font-bold text-white mb-4">Welcome aboard</Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-gray-300 mb-2">Email</Text>
            <TextInput
              className="px-2 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your email"
              placeholderTextColor={"#6b7280"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-300 mb-2">Password</Text>
            <TextInput
              className="px-2 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your password"
              placeholderTextColor={"#6b7280"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white py-3 rounded-lg"
          >
            <Text className="text-black text-center font-semibold text-lg">Sign Up</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-400">Already have an account? </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-blue-400 font-semibold">Sign In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}