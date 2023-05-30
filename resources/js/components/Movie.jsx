import React, { useState } from 'react'

const Movie = ({ movie }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  return (
    <div className="movie-wrapper">
      <button className={moreInfo && 'active'} onClick={() => setMoreInfo(!moreInfo)}>
       <p>{movie.title}</p>
      </button>
      {moreInfo &&
        <div className="info-wrapper">
          <p>Genre: {movie.genre}</p>
          <p>Utgivningsår: {movie.release_year}</p>
          <p>Betyg IMDB: {movie.rating}</p>
        </div>
      }
    </div>
  )
}

export default Movie
