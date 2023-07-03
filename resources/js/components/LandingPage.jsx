import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'
import Logout from './Logout'
import Login from './Login'
import ClipLoader from "react-spinners/ClipLoader"
import MyProfile from './MyProfile'

const LandingPage = () => {
  const [movies, setMovies] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const getAuthenticatedContent = async () => {
    const token = getToken()
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data.movies)
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      console.log('Token not found')
    }
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  useEffect(() => {
    getAuthenticatedContent()
    const tokenInterval = setInterval(() => {
      const token = getToken()
      if (token) {
        clearInterval(tokenInterval)
        getAuthenticatedContent()
      }
    }, 100)

    return () => {
      clearInterval(tokenInterval)
    }
  }, [])

  useEffect(() => {
    getAuthenticatedContent()
  }, [])

  useEffect(() => {
    const token = getToken()
    if(token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <div className="landingpage-wrapper">
      {loggedIn ?
      <>

      {loading ? <ClipLoader />
      :
      <div className="movie-profile-wrapper">
      <MyProfile user={user} />
      <div className="movies-container">
      {/* {movies.length
      ?
      <h4>Mina filmer</h4>
      :
      <p>Du har inga filmer att visa för tillfället.</p>
      } */}
      {movies?.map((movie) => (
        <Movie
        key={movie.id}
        movie={movie}
        user={user}
        setMovies={setMovies}
         />
      ))}
      </div>
      </div>
      }

      </>
      :
      <>
        <p>Välkommen till filmdatabasen!</p>
        <p>Var vänlig logga in eller skapa ett konto för att ta del av innehållet.</p>

        <Login />
      </>
      }

    </div>
  )
}

export default LandingPage
