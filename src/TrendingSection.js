// TrendingSection.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TrendingSection = () => {
  const [trending, setTrending] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week'

  useEffect(() => {
    fetchTrending();
  }, [timeWindow]);

  const fetchTrending = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed`
      );
      const data = await response.json();
      setTrending(data.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching trending:', error);
    }
  };

  return (
    <div className="trending-section">
      <div className="trending-header">
        <h2>Trending</h2>
        <div className="trending-toggle">
          <button
            className={timeWindow === 'day' ? 'active' : ''}
            onClick={() => setTimeWindow('day')}
          >
            Today
          </button>
          <button
            className={timeWindow === 'week' ? 'active' : ''}
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="trending-movies">
        {trending.map(movie => (
          <motion.div
            key={movie.id}
            className="trending-movie"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="trending-movie-info">
              <h3>{movie.title}</h3>
              <p>{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;