import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPlay, FaTimes } from 'react-icons/fa';

const MovieDetail = ({ movieId, onClose, isTvShows }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTrailer, setShowTrailer] = useState(false);

    const baseUrl = isTvShows
        ? `https://api.themoviedb.org/3/tv/${movieId}?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&append_to_response=credits,similar,videos,reviews`
        : `https://api.themoviedb.org/3/movie/${movieId}?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&append_to_response=credits,similar,videos,reviews`


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const detailsResponse = await fetch(baseUrl);
        const data = await detailsResponse.json();
        setMovieDetails(data);
          setCast(data.credits.cast.slice(0, 10));
        setSimilar(data.similar.results.slice(0, 6));
        setVideos(data.videos.results.filter(video => video.type === "Trailer" || video.type === "Teaser"));
          setReviews(data.reviews.results);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId, isTvShows, baseUrl]);

    if (!movieDetails) return <div className="loader">Loading...</div>;

    const mainTrailer = videos[0];
    const title = isTvShows ? movieDetails.name : movieDetails.title;
    const releaseDate = isTvShows ? movieDetails.first_air_date : movieDetails.release_date;
    const runtime = isTvShows ? null : movieDetails.runtime;

  return (
    <motion.div 
      className="movie-detail-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="movie-detail-hero" style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
        }}>
          <div className="hero-content">
            <h1>{title}</h1>
            {mainTrailer && (
              <button 
                className="play-trailer"
                onClick={() => setShowTrailer(true)}
              >
                <FaPlay /> Watch Trailer
              </button>
            )}
          </div>
        </div>

        <div className="movie-detail-info">
          <div className="movie-stats">
            <span className="rating">
              <FaStar /> {movieDetails.vote_average.toFixed(1)}
            </span>
            <span className="release-date">
              {new Date(releaseDate).getFullYear()}
            </span>
            {runtime && (
                <span className="runtime">
                    {Math.floor(runtime / 60)}h {runtime % 60}m
                </span>
            )}
          </div>

          <div className="movie-detail-tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'cast' ? 'active' : ''}
              onClick={() => setActiveTab('cast')}
            >
              Cast
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={activeTab === 'similar' ? 'active' : ''}
              onClick={() => setActiveTab('similar')}
            >
              Similar Content
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <p>{movieDetails.overview}</p>
                <div className="genres">
                  {movieDetails.genres.map(genre => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="cast-tab">
                {cast.map(person => (
                  <div key={person.id} className="cast-member">
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'
                      }}
                    />
                    <h3>{person.name}</h3>
                    <p>{person.character}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                {reviews.length > 0 ? reviews.map(review => (
                  <div key={review.id} className="review">
                    <div className="review-header">
                      <h3>{review.author}</h3>
                      {review.author_details.rating && (
                        <span className="review-rating">
                          <FaStar /> {review.author_details.rating}
                        </span>
                      )}
                    </div>
                    <p>{review.content.slice(0, 300)}...</p>
                  </div>
                )) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="similar-tab">
                {similar.map(content => (
                  <div 
                    key={content.id} 
                    className="similar-movie"
                    onClick={() => {
                        setMovieDetails(null);
                        movieId = content.id;
                    }}
                  >
                    <img 
                        src={`https://image.tmdb.org/t/p/w200${content.poster_path || content.backdrop_path}`}
                      alt={content.title || content.name}
                    />
                    <h3>{content.title || content.name}</h3>
                    <span className="similar-rating">
                      <FaStar /> {content.vote_average.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showTrailer && mainTrailer && (
          <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
            <div className="trailer-content">
              <iframe
                title="Movie Trailer"
                src={`https://www.youtube.com/embed/${mainTrailer.key}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default MovieDetail;