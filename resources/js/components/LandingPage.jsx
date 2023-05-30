import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

const LandingPage = () => {
  const [movies, setMovies] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const testAuth = async () => {
    const token = getToken()
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setMovies(response.data.movies)
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Token not found')
    }
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  useEffect(() => {
    testAuth()
    const tokenInterval = setInterval(() => {
      const token = getToken()
      if (token) {
        clearInterval(tokenInterval)
        testAuth()
      }
    }, 100);

    return () => {
      clearInterval(tokenInterval)
    }
  }, [])

  useEffect(() => {
    const token = getToken()
    if(token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {loggedIn ?
      <>
    <button onClick={handleLogout} className="logout-button">
      Logga ut
    </button>
      <h1>Mina filmer</h1>
      {movies?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
      <p>Välkommen {user.name}!</p>
      </> :
      <h1>Du är inte inloggad</h1> }

    </div>
  );
};

export default LandingPage
