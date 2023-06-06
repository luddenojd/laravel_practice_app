import React, { useState } from 'react'
import axios from 'axios'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const Movie = ({ movie, user }) => {
  const [moreInfo, setMoreInfo] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const addMovieToUser = async (movieId) => {
    let userId = user.id.toString();
    let movieIdString = movieId.toString();
    console.log(userId);
    const token = getToken();
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/users/${userId}/movies/${movieIdString}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle the response here if needed
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="movie-wrapper">
      <button className={moreInfo ? 'active' : ''} onClick={() => setMoreInfo(!moreInfo)}>
       <p>{movie.title}</p>
      </button>
      {moreInfo &&
        <div className="info-wrapper">
          <p>{movie.genres.length > 1 ? 'Genres: ' : 'Genre: '}{movie.genres?.map((genre) => (
            ` ${genre.title}`
          ))}</p>
          <p>Utgivningsår: {movie.release_year}</p>
          <p>Betyg IMDB: {movie.rating}</p>
          <button className="favorite-button" onClick={() => addMovieToUser(movie.id)}>
            <AiFillHeart />
            <p>Spara som favorit</p>
          </button>
        </div>
      }
    </div>
  )
}

export default Movie
