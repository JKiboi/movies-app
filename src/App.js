import React, { useState,useEffect } from 'react';
import "./App.css"
import Movie from './Movie';
import Filter from './Filter';
import { motion } from 'framer-motion';


function App() {

  const [popular,setPopular]=useState([])
  const [filtered,setFiltered]=useState([])
  const [activeGenre,setActiveGenre]=useState(0)


  useEffect(()=>{
    fetchPopular()
  },[])

  const fetchPopular=async()=>{
    const data=await fetch("https://api.themoviedb.org/3/movie/popular?api_key=adf81d2fbdf4fb5f54e9b8180d4e2bed&language=en-US&page=1");
    const movies=await data.json()
    console.log(movies)
    setPopular(movies.results)
    setFiltered(movies.results)

  }
  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
      <motion.div layout className="popular-movies">
        {filtered.map(movie=>{
          return <Movie key={movie.id} movie={movie}/>
        })}
      </motion.div>
    </div>
  );
}

export default App;
