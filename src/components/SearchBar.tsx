import React, { FormEvent, useState } from 'react';
    import { Search } from 'lucide-react';
    import { saveSearch } from '../lib/searches';
    import toast from 'react-hot-toast';

    type SearchBarProps = {
      onSearch: (query: string) => void;
      value?: string;
      onChange?: (value: string) => void;
    };

    export function SearchBar({ onSearch, value, onChange }: SearchBarProps) {
      const [query, setQuery] = useState(value || '');
      const [isSearching, setIsSearching] = useState(false);

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!query.trim()) return;
        setIsSearching(true);
        try {
          await saveSearch(query.trim());
          onSearch(query.trim());
        } catch (error) {
          toast.error('Failed to save search');
        } finally {
          setIsSearching(false);
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
            <Search className={`w-5 h-5 text-white ${isSearching ? 'animate-spin' : ''}`} />
          </button>
        </form>
      );
    }
