import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Filter from './Filter';
import SearchBar from './SearchBar';
import TrendingSection from './TrendingSection';
import UpcomingMovies from './UpcomingMovies';
import MovieDetail from './MovieDetail';
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
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [releaseYearFilter, setReleaseYearFilter] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState('');

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

    useEffect(() => {
        let filteredMovies = [...popular];
    
        if (activeGenre !== 0) {
          filteredMovies = filteredMovies.filter(movie =>
            movie.genre_ids.includes(activeGenre)
          );
        }
    
        if (releaseYearFilter) {
          filteredMovies = filteredMovies.filter(movie =>
            new Date(movie.release_date).getFullYear().toString() === releaseYearFilter
          );
        }
        if(minRatingFilter){
          filteredMovies = filteredMovies.filter(movie =>
            movie.vote_average >= parseFloat(minRatingFilter)
          );
        }
    
        setFiltered(filteredMovies);
      }, [popular, activeGenre, releaseYearFilter, minRatingFilter]);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
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
      
      {!isSearching && <UpcomingMovies />}


      <Filter 
        popular={popular} 
        setFiltered={setFiltered} 
        activeGenre={activeGenre} 
        setActiveGenre={setActiveGenre}
        releaseYearFilter={releaseYearFilter}
        setReleaseYearFilter={setReleaseYearFilter}
        minRatingFilter={minRatingFilter}
        setMinRatingFilter={setMinRatingFilter}
      />
      
      <AnimatePresence>
        <motion.div layout className="movies-grid">
          {(isSearching ? searchResults : filtered).map(movie => (
            <Movie key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
          ))}
        </motion.div>
      </AnimatePresence>
        
      {selectedMovieId && (
        <MovieDetail movieId={selectedMovieId} onClose={handleCloseModal} />
      )}

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