import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash/debounce';

const SearchBar = ({ setSearchResults, setIsSearching }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setIsSearching(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const debouncedSearch = debounce(searchMovies, 500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;