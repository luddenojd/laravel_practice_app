import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'
import Logout from './Logout'
import Login from './Login'

const LandingPage = () => {
  const [movies, setMovies] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

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
    getAuthenticatedContent()
    const tokenInterval = setInterval(() => {
      const token = getToken()
      if (token) {
        clearInterval(tokenInterval)
        getAuthenticatedContent()
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

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem('token')

  //     await axios.post('http://localhost:8000/api/logout', null, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });
  //     localStorage.removeItem('token')
  //     window.location.href = '/'
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      {loggedIn ?
      <>
      <h1>Välkommen {user.name}!</h1>
    {/* <button onClick={handleLogout} className="logout-button">
      Logga ut
    </button> */}
      <Logout />
      <h1>Mina filmer</h1>
      {movies?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}

      </> :
      <>
        <h1>Du är inte inloggad</h1>
        <Login />
      </>
      }

    </div>
  );
};

export default LandingPage
