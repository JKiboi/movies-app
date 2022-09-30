import React, { useEffect } from 'react'


const Filter = ({popular,setFiltered,activeGenre,setActiveGenre}) => {

    useEffect(()=>{
       if(activeGenre===0){
        setFiltered(popular)
        return;
       }
       const filtered=popular.filter(movie=>movie.genre_ids.includes(activeGenre)
       )
       setFiltered(filtered)

    },[activeGenre])

  return (
    <div className='container'>
      <div className='filter-container'>
        <button className={activeGenre===0?"active":""} onClick={()=>setActiveGenre(0)}>All</button>
        <button className={activeGenre===16?"active":""}  onClick={()=>setActiveGenre(16)}>Animation</button>
        <button className={activeGenre===80?"active":""} onClick={()=>setActiveGenre(80)}>Crime</button>
        <button className={activeGenre===35?"active":""} onClick={()=>setActiveGenre(35)}>Comedy</button>
        <button className={activeGenre===18?"active":""} onClick={()=>setActiveGenre(18)}>Drama</button>
        <button className={activeGenre===12?"active":""} onClick={()=>setActiveGenre(12)}>Adventure</button>
        <button className={activeGenre===99?"active":""} onClick={()=>setActiveGenre(99)}>Docu</button>
        <button className={activeGenre===36?"active":""} onClick={()=>setActiveGenre(36)}>History</button>
      
    </div>
    </div>
  )
}

export default Filter
