import React from 'react';
import { motion } from 'framer-motion';

const Filter = ({ setActiveGenre, activeGenre, setFiltered, popular, releaseYearFilter, setReleaseYearFilter, minRatingFilter, setMinRatingFilter, isTvShows }) => {
  const genres = [
    { id: 0, name: 'All' },
    { id: 16, name: 'Animation' },
    { id: 80, name: 'Crime' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 12, name: 'Adventure' },
    { id: 99, name: 'Documentary' },
    { id: 36, name: 'History' },
      { id: 10759, name: 'Action & Adventure' },
      { id: 10762, name: 'Kids' },
      { id: 10763, name: 'News' },
      { id: 10764, name: 'Reality' },
      { id: 10765, name: 'Sci-Fi & Fantasy' },
      { id: 10766, name: 'Soap' },
      { id: 10767, name: 'Talk' },
      { id: 10768, name: 'War & Politics' }
  ];

    const tvGenres = [
        { id: 0, name: 'All' },
        {id: 10759, name: 'Action & Adventure'},
        {id: 16, name: 'Animation'},
        {id: 35, name: 'Comedy'},
        {id: 80, name: 'Crime'},
        {id: 99, name: 'Documentary'},
        {id: 18, name: 'Drama'},
        {id: 10762, name: 'Kids'},
        {id: 10763, name: 'News'},
        {id: 10764, name: 'Reality'},
        {id: 10765, name: 'Sci-Fi & Fantasy'},
        {id: 10766, name: 'Soap'},
        {id: 10767, name: 'Talk'},
        {id: 10768, name: 'War & Politics'},
    ]


    const handleYearChange = (e) => {
        setReleaseYearFilter(e.target.value);
      };
    
    const handleRatingChange = (e) =>{
      setMinRatingFilter(e.target.value)
    }

  return (
    <div className="filter-section">
      <div className="filter-container">
          {(isTvShows ? tvGenres : genres).map(genre => (
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