import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TrendingSection = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingType, setTrendingType] = useState('day');
  
    useEffect(() => {
      const fetchTrending = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/${trendingType}?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed`
          );
          const data = await response.json();
          setTrendingMovies(data.results.slice(0, 5));
        } catch (error) {
          console.error('Error fetching trending movies:', error);
        }
      };
  
      fetchTrending();
    }, [trendingType]);
    
  const handleTrendingType = (type) =>{
        setTrendingType(type)
  }
  
  return (
    <div className="trending-section">
        <div className="trending-header">
            <h2>Trending Content</h2>
            <div className="trending-toggle">
                <button 
                  className={trendingType === 'day' ? 'active' : ''}
                  onClick={() => handleTrendingType('day')}>
                  Today
                </button>
                  <button 
                    className={trendingType === 'week' ? 'active' : ''}
                  onClick={() => handleTrendingType('week')}>
                   This week
                  </button>
            </div>
          </div>
        <div className="trending-movies">
            {trendingMovies.map(content => (
                <motion.div 
                  key={content.id} 
                  className="trending-movie"
                  whileHover={{scale: 1.05}}
                 >
                  <img
                      src={`https://image.tmdb.org/t/p/w300${content.poster_path || content.backdrop_path}`}
                    alt={content.title || content.name}
                  />
                  <div className="trending-movie-info">
                    <h3>{content.title || content.name}</h3>
                  </div>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default TrendingSection;