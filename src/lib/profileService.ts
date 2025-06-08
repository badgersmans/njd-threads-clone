import { supabase } from '@/lib/supabase'
import { Tables, TablesUpdate } from '@/types/database.types';

type UserProfile = Tables<'profiles'>
type UpdateProfile = TablesUpdate<'profiles'>

export const fetchProfileById = async (id: string): Promise<UserProfile> => {
  const {data, error} = await supabase
  .from('profiles')
  .select('*')
  .eq('id', id)
  .single()
  .throwOnError()

  // console.log(JSON.stringify(data, null, 2))
  return data;
}

export const updateUserProfile = async (update: UpdateProfile) => {
  const { data, error } = await supabase
  .from('profiles')
  .update(update)
  .eq('id', update.id)
  .select('*')
  .single()
  .throwOnError()

  console.log(JSON.stringify(data, null, 2))
  return data;
}