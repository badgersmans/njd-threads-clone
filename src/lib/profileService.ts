import { supabase } from '@/lib/supabase'
import { Tables } from '@/types/database.types';

type UserProfile = Tables<'profiles'>

export const fetchProfileById = async (id: string): Promise<UserProfile> => {
  const {data, error} = await supabase
  .from('profiles')
  .select('*')
  .eq('id', id)
  .single()
  .throwOnError()

  console.log(JSON.stringify(data, null, 2))
  return data;
}