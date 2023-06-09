import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from './Movie'
import ClipLoader from "react-spinners/ClipLoader"
import SearchComponent from './SearchComponent'

const AllMovies = () => {
  const [movies, setMovies] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getAllMovies = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/allmovies', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data)
        setMovies(response.data.movies)
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="all-movies-wrapper">
      <h1>Alla filmer</h1>
      <SearchComponent
        setMovies={setMovies}
        getAllMovies={getAllMovies}
        setError={setError}
      />
      {loading
      ?
      <ClipLoader />
      :
      error !== ''
      ?
      <h4>{error}</h4>
      :
      (movies?.map((movie) => (
        <Movie
          key={movie.id}
          user={user}
          movie={movie}
        />
      )))
      }
    </div>
  )
}

export default AllMovies
