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
    const [isTvShows, setIsTvShows] = useState(false);


    useEffect(() => {
        fetchPopular();
    }, [currentPage, isTvShows]);

    const fetchPopular = async () => {
        try {
            setLoading(true);
             const baseUrl = isTvShows
            ? `https://api.themoviedb.org/3/tv/popular?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=${currentPage}`
            :`https://api.themoviedb.org/3/movie/popular?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=${currentPage}`;
        
            const data = await fetch(baseUrl);
            const response = await data.json();
          
          
            setPopular(response.results);
            setFiltered(response.results);
            setTotalPages(response.total_pages);
             setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to fetch content. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        let filteredContent = [...popular];
    
          if (activeGenre !== 0) {
              if(isTvShows){
                  filteredContent = filteredContent.filter(show => show.genre_ids.includes(activeGenre));
              }else{
            filteredContent = filteredContent.filter(movie =>
              movie.genre_ids.includes(activeGenre)
              );
            }
          }
        if (releaseYearFilter) {
          filteredContent = filteredContent.filter(content =>
            new Date(isTvShows ? content.first_air_date : content.release_date).getFullYear().toString() === releaseYearFilter
          );
        }
        if (minRatingFilter) {
          filteredContent = filteredContent.filter(content =>
            content.vote_average >= parseFloat(minRatingFilter)
          );
        }
    
        setFiltered(filteredContent);
    }, [popular, activeGenre, releaseYearFilter, minRatingFilter, isTvShows]);


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

  const handleMediaTypeChange = (type) => {
      setIsTvShows(type === 'tv');
      setActiveGenre(0);
      setCurrentPage(1);
      setReleaseYearFilter('');
      setMinRatingFilter('');
  }


    return (
        <div className="app">
            <header className="header">
                <h1>C-NEMA</h1>
                <p>Discover your next favorite content</p>
            </header>

            <SearchBar
                setSearchResults={setSearchResults}
                setIsSearching={setIsSearching}
            />

            {!isSearching && <TrendingSection />}

            {!isSearching && <UpcomingMovies />}

        <div className="media-type-toggle">
          <button
            className={!isTvShows ? 'active' : ''}
            onClick={() => handleMediaTypeChange('movie')}
          >
            Movies
          </button>
          <button
            className={isTvShows ? 'active' : ''}
            onClick={() => handleMediaTypeChange('tv')}
          >
            TV Shows
          </button>
        </div>

            <Filter
                popular={popular}
                setFiltered={setFiltered}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
                releaseYearFilter={releaseYearFilter}
                setReleaseYearFilter={setReleaseYearFilter}
                minRatingFilter={minRatingFilter}
                setMinRatingFilter={setMinRatingFilter}
                isTvShows={isTvShows}
            />
 
             {error && <p className="error">{error}</p>}

            <AnimatePresence>
                <motion.div layout className="movies-grid">
                  {
                    filtered.length > 0 ? (
                      (isSearching ? searchResults : filtered).map(content => (
                        <Movie key={content.id} movie={content} onMovieClick={handleMovieClick} isTvShows={isTvShows} />
                      ))
                    ) : (
                      <p className="no-results">No results found for the selected criteria.</p>
                  )}
                </motion.div>
            </AnimatePresence>
            
            {selectedMovieId && (
                <MovieDetail movieId={selectedMovieId} onClose={handleCloseModal} isTvShows={isTvShows}/>
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