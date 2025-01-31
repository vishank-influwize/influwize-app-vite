import React, { useState } from 'react';
    import { SearchBar } from '../SearchBar';
    import SearchResults from './SearchResults';
    import { searchInfluencers } from '../../lib/api';
    import toast from 'react-hot-toast';

    export function SearchSection() {
      const [loading, setLoading] = useState(false);
      const [results, setResults] = useState<any[]>([]); // Initialize as an empty array
      const [hasSearched, setHasSearched] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const ITEMS_PER_PAGE = 25;

      const handleSearch = async (query: string) => {
        setLoading(true);
        setHasSearched(true);
        try {
          const data = await searchInfluencers(query);
          setResults(data);
          setCurrentPage(1); // Reset to first page on new search
        } catch (error) {
          toast.error('Search failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      // Calculate pagination
      const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
      const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
      const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

      return (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">Find Creators</h1>
          
          <SearchBar onSearch={handleSearch} />

          {hasSearched && (
            <div className="mt-8">
              <SearchResults 
                loading={loading} 
                results={currentItems}
                pagination={{
                  currentPage,
                  totalPages,
                  totalResults: results.length,
                  onPageChange: setCurrentPage
                }}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </div>
      );
    }
