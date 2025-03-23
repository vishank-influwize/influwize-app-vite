import React, { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { saveSearch } from '../lib/searches';
import { supabase } from '../lib/supabase';

type SearchBarProps = {
  onSearch: (query: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  skipSaveSearch?: boolean;
};

export function SearchBar({ onSearch, value, onChange, skipSaveSearch = false }: SearchBarProps) {
  const [query, setQuery] = useState(value || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    try {
      // Only try to save search if not explicitly skipped
      if (!skipSaveSearch) {
        // Check if user is authenticated before saving
        const { data } = await supabase.auth.getUser();
        
        if (data.user) {
          await saveSearch(query.trim());
        }
      }
      
      // Always execute the search, even if saving fails
      onSearch(query.trim());
    } catch (error) {
      // Silent fail on saving error - just log to console
      console.error('Failed to save search:', error);
      // Don't show error toast to users
      
      // Still perform the search even if saving failed
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Describe your ideal influencer"
        className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors"
      >
        <Search className="w-5 h-5 text-white" />
      </button>
    </form>
  );
}
