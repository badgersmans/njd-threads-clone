import { supabase } from '@/lib/supabase'
import { TablesInsert } from '@/types/database.types';

type InsertPost = TablesInsert<'posts'>

export const fetchPosts = async () => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*), replies:posts(count)')
  .is('parent_id', null)
  .order('created_at', { ascending: false })
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const fetchPostById = async (id: string) => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*), replies:posts(count)')
  .eq('id', id)
  .single()
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const fetchPostsByUserId = async (id: string) => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*), replies:posts(count)')
  .eq('user_id', id)
  .order('created_at', { ascending: false })
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const fetchPostReplies = async (id: string) => {
  const {data, error} = await supabase
  .from('posts')
  .select('*, user:profiles(*), replies:posts(count)')
  .eq('parent_id', id)
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const createPost = async (newPost: InsertPost) => {
  const {data} = await supabase
  .from('posts')
  .insert(newPost)
  .throwOnError()
  .select('*')

  // console.log(JSON.stringify(data, null, 2))
  return data
}