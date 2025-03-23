import { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import SearchResults from './SearchResults';
import { searchInfluencers } from '../../lib/api';
import toast from 'react-hot-toast';

type SearchSectionProps = {
  initialQuery?: string | null;
};

export function SearchSection({ initialQuery }: SearchSectionProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]); // Initialize as an empty array
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(initialQuery || '');
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Available options for items per page
  const itemsPerPageOptions = [10, 15, 20, 25];

  // Run search if initialQuery is provided
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setHasSearched(true);
    setQuery(searchQuery);
    try {
      const data = await searchInfluencers(searchQuery);
      setResults(data);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      toast.error('Search failed. Please try again.');
      console.error('Search error:', error);
      setResults([]); // Set empty results on error
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    // Make sure we're within valid range
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
      // Scroll back to the top of the results
      const resultsElement = document.querySelector('.search-results-container');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback if the specific element isn't found
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle change in items per page
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    // Calculate which item should be at the top of the new page
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    
    // Set the new items per page
    setItemsPerPage(newItemsPerPage);
    
    // Recalculate the current page to keep the user roughly at the same position in results
    const newPage = Math.floor(firstItemIndex / newItemsPerPage) + 1;
    setCurrentPage(Math.max(1, Math.min(newPage, Math.ceil(results.length / newItemsPerPage))));
  };

  // Calculate pagination
  const totalResults = results.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));
  // Ensure current page is valid
  const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
  
  // If current page is not safe, update it silently
  if (currentPage !== safePage && totalResults > 0) {
    setCurrentPage(safePage);
  }
  
  const indexOfLastItem = safePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Make sure we don't go out of bounds
  const currentItems = results.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalResults));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Find Creators</h1>
      
      <SearchBar onSearch={handleSearch} value={query} onChange={setQuery} />

      {hasSearched && (
        <div className="mt-8">
          <SearchResults 
            loading={loading} 
            results={currentItems}
            allResults={results} 
            pagination={{
              currentPage: safePage,
              totalPages,
              totalResults: totalResults,
              onPageChange: handlePageChange
            }}
            itemsPerPage={itemsPerPage}
            itemsPerPageOptions={itemsPerPageOptions}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}
