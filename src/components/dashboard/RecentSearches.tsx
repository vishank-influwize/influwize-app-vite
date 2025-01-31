import React, { useEffect, useState } from 'react';
import { Search, Clock, X} from 'lucide-react';
import { getRecentSearches, type RecentSearch } from '../../lib/searches';
import SearchResults from './SearchResults';
import toast from 'react-hot-toast';

export function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSearch, setSelectedSearch] = useState<RecentSearch | null>(null);
  const [searchResults, setSearchResults] = useState({
    loading: false,
    results: []
  });

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const data = await getRecentSearches();
      setSearches(data);
    } catch (error) {
      toast.error('Failed to load recent searches');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Recent Searches</h1>
      </div>

      {selectedSearch ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-purple-400" />
              <span className="text-gray-200">{selectedSearch.query}</span>
            </div>
            <button 
              onClick={() => setSelectedSearch(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SearchResults loading={searchResults.loading} results={searchResults.results} />
        </div>
      ) : (
        <div className="space-y-4">
          {searches.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-lg">
              <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No recent searches yet</p>
            </div>
          ) : (
            searches.map((search) => (
              <button
                key={search.id}
                className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors text-left group"
                onClick={() => setSelectedSearch(search)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-200">{search.query}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(search.created_at)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
