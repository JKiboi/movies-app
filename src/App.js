import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Filter from './Filter';
import SearchBar from './SearchBar';
import TrendingSection from './TrendingSection';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPopular();
  }, [page]);

  const fetchPopular = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=${page}`
      );
      const movies = await data.json();
      if (page === 1) {
        setPopular(movies.results);
        setFiltered(movies.results);
      } else {
        setPopular(prev => [...prev, ...movies.results]);
        setFiltered(prev => [...prev, ...movies.results]);
      }
      setHasMore(movies.page < movies.total_pages);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>MovieVerse</h1>
        <p>Discover your next favorite movie</p>
      </header>

      <SearchBar 
        setSearchResults={setSearchResults} 
        setIsSearching={setIsSearching}
      />
      
      {!isSearching && <TrendingSection />}

      <Filter 
        popular={popular} 
        setFiltered={setFiltered} 
        activeGenre={activeGenre} 
        setActiveGenre={setActiveGenre}
      />
      
      <AnimatePresence>
        <motion.div layout className="movies-grid">
          {(isSearching ? searchResults : filtered).map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </motion.div>
      </AnimatePresence>

      {!isSearching && hasMore && (
        <div className="load-more">
          <button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Movies'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;