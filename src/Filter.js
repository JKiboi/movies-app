import React from 'react';
import { motion } from 'framer-motion';

const Filter = ({ setActiveGenre, activeGenre, setFiltered, popular, releaseYearFilter, setReleaseYearFilter, minRatingFilter, setMinRatingFilter }) => {
  const genres = [
    { id: 0, name: 'All' },
    { id: 16, name: 'Animation' },
    { id: 80, name: 'Crime' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 12, name: 'Adventure' },
    { id: 99, name: 'Documentary' },
    { id: 36, name: 'History' }
  ];

  const handleYearChange = (e) => {
    setReleaseYearFilter(e.target.value);
  };
    
    const handleRatingChange = (e) =>{
      setMinRatingFilter(e.target.value)
    }

  return (
    <div className="filter-section">
      <div className="filter-container">
        {genres.map(genre => (
          <motion.button
            key={genre.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={activeGenre === genre.id ? 'active' : ''}
            onClick={() => setActiveGenre(genre.id)}
          >
            {genre.name}
          </motion.button>
        ))}
          
      </div>
        <div className="filter-inputs">
            <input
              type="number"
              placeholder="Release Year"
              value={releaseYearFilter}
              onChange={handleYearChange}
              className="filter-input"
          />
          <input
            type="number"
            placeholder="Min Rating"
            value={minRatingFilter}
            onChange={handleRatingChange}
            className="filter-input"
            min="0"
            max="10"
            step="0.1"
           />
        </div>
    </div>
  );
};

export default Filter;