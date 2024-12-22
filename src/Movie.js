import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaExpand } from 'react-icons/fa';

const Movie = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="movie-card"
      whileHover={{ y: -10 }}
    >
      <div className="movie-image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
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
        <h2>{movie.title}</h2>
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          className="movie-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>{movie.overview}</p>
          <div className="additional-info">
            <span>Release: {movie.release_date}</span>
            <span>Popularity: {Math.round(movie.popularity)}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Movie;