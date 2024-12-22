import React from 'react';
import { motion } from 'framer-motion';

const Filter = ({ setActiveGenre, activeGenre, setFiltered, popular }) => {
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

  React.useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter(movie => 
      movie.genre_ids.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre, popular, setFiltered]);

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
    </div>
  );
};

export default Filter;