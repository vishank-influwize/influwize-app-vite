const API_URL = 'https://api.influwize.com';

export type InfluencerProfile = {
  username: string;
  full_name: string;
  followers: number;
  engagement_rate: number;
  location: Array<{city: string; country: string}>;
  interests: string[];
  category: string;
  avg_likes: number;
  avg_comments: number;
};

export async function searchInfluencers(query: string): Promise<InfluencerProfile[]> {
  try {
    console.log('Making API request with query:', query);
    
    const response = await fetch(`${API_URL}/fetch_profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Search request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}
