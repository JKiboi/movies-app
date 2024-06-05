import React from "react";
import { motion } from "framer-motion";
import rating from "./assets/rating.png";
import "./App.css";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <motion.div layout>
        <h2>{movie.title}</h2>
        <img
          src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
          alt=""
        />
        <p>{movie.overview}</p>
        <div className="rating">
          <img src={rating} alt="Rating" className="rating-icon" />
          <p>{movie.vote_average}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Movie;
