import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import ClipLoader from "react-spinners/ClipLoader"

const Movie = ({ movie, user, setMovies }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const addMovieToUser = async (movieId, movieFavorite) => {
    let userId = user.id.toString()
    let movieIdString = movieId.toString()

    const token = getToken()
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
        )
        setIsFavorite(response.data.is_favorite)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deleteMovieFromUser = async (movieId, movieFavorite) => {
    let userId = user.id.toString()
    let movieIdString = movieId.toString()
    const token = getToken()
    if(token) {
      try {
        const response = await axios.put(`http://localhost:8000/api/users/${userId}/movies/${movieIdString}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setIsFavorite(response.data.is_favorite)
        setMovies(response.data.new_movies)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setIsFavorite(movie.is_favorite)
  }, [])



  return (
    <div className="movie-wrapper">
      <button className={moreInfo ? 'active' : ''} onClick={() => setMoreInfo(!moreInfo)}>
       <p>{movie?.title}</p>
      </button>
      {moreInfo &&
        <div className="info-wrapper">
          <p>{movie?.genres?.length > 1 ? 'Genres: ' : 'Genre: '}{movie.genres?.map((genre) => (
            ` ${genre.title}`
          ))}</p>
          <p>Utgivningsår: {movie?.release_year}</p>
          <p>Betyg IMDB: {movie?.rating}</p>
              {isFavorite
              ?
              <button className="favorite-button" onClick={() => deleteMovieFromUser(movie.id, movie.is_favorite)}>
                <AiFillHeart />
                <p>Sparad</p>
              </button>
              :
              <button className="favorite-button" onClick={() => addMovieToUser(movie.id, movie.is_favorite)}>
                <AiOutlineHeart />
                <p>Spara</p>
              </button>
              }
        </div>
      }
    </div>
  )
}

export default Movie
