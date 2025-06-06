import { supabase } from '@/lib/supabase'

export const fetchPosts = async () => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*)')
  .order('created_at', { ascending: false })
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const fetchPostById = async (id: string) => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*)')
  .eq('id', id)
  .single()
  .throwOnError()

  console.log(JSON.stringify(data, null, 2))
  return data;
}

export const createPost = async (text, userId) => {
  if (!text || !userId) return;

  const {data} = await supabase
  .from('posts')
  .insert({content: text, user_id: userId})
  .throwOnError()
  .select('*')

  return data
}