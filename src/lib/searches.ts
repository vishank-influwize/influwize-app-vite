import { supabase } from './supabase';

export type RecentSearch = {
  id: string;
  query: string;
  created_at: string;
};

export async function saveSearch(query: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('recent_searches')
    .insert([{ 
      query,
      user_id: user.id 
    }]);
  
  if (error) throw error;
}

export async function getRecentSearches(): Promise<RecentSearch[]> {
  const { data, error } = await supabase
    .from('recent_searches')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data || [];
}
