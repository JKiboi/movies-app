import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar } from 'react-icons/fa';

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=1'
        );
        const data = await response.json();
        setUpcoming(data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcoming();
  }, []);

  return (
    <div className="upcoming-section">
      <h2><FaCalendar /> Coming Soon</h2>
      <div className="upcoming-movies">
        {upcoming.map(movie => (
          <motion.div
            key={movie.id}
            className="upcoming-movie"
            whileHover={{ scale: 1.05 }}
          >
            <div className="upcoming-date">
              {new Date(movie.release_date).toLocaleDateString()}
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="upcoming-info">
              <h3>{movie.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;