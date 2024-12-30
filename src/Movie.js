import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaExpand } from 'react-icons/fa';

const Movie = ({ movie, onMovieClick, isTvShows }) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const imageUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x281?text=No+Image'
    const title = isTvShows ? movie.name : movie.title;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const overview = movie.overview ? movie.overview : 'No overview available';
    const releaseDate = isTvShows ? movie.first_air_date : movie.release_date;
    const popularity = Math.round(movie.popularity);


  return (
    <motion.div 
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="movie-card"
      whileHover={{ y: -10 }}
      onClick={() => onMovieClick(movie.id)}
    >
      <div className="movie-image-container">
        <img
          src={imageUrl}
          alt={title}
          className="movie-image"
        />
        <div className="movie-overlay">
          <button 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FaExpand />
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h2>{title}</h2>
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{rating}</span>
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          className="movie-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>{overview}</p>
          <div className="additional-info">
            <span>Release: {releaseDate}</span>
            <span>Popularity: {popularity}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Movie;