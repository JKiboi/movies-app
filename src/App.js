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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [releaseYearFilter, setReleaseYearFilter] = useState('');
    const [minRatingFilter, setMinRatingFilter] = useState('');

    useEffect(() => {
        fetchPopular();
    }, [currentPage]);

    const fetchPopular = async () => {
        try {
            setLoading(true);
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=${currentPage}`
            );
            const movies = await data.json();
            setPopular(movies.results);
            setFiltered(movies.results);
            setTotalPages(movies.total_pages);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
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


    const goToPreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
      }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
        }
    };


    return (
        <div className="app">
            <header className="header">
                <h1>C-NEMA</h1>
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

          {!isSearching && (
            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={currentPage === 1 || loading}>
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button onClick={goToNextPage} disabled={currentPage === totalPages || loading}>
                Next
              </button>
            </div>
          )}
        </div>
    );
}

export default App;