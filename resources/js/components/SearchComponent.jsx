import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchComponent = ({ setMovies, getAllMovies, setError }) => {
  const [query, setQuery] = useState('')

  const goFind = async () => {
    const token = getToken()
    if(token) {
      if(query !== '') {
        try {
          const response = await axios.get('http://localhost:8000/api/search', {
            params: {
              query: query
            },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if(response.data.movies.length !== 0) {
            setMovies(response.data.movies)
          } else {
            setError(`Det finns inga filmer som innehåller sökordet: ${query}`)
          }

        } catch (error) {

        }
      }
    }
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const handleKey = (e) => {
    if(e.key === "Enter") {
      goFind()
    }
  }

  useEffect(() => {
    if(query === "") {
      getAllMovies()
      setError('')
    } else {
      goFind()
    }
  }, [query])

  return (
    <div className="search-wrapper">
      <div className="input-wrapper">
        <p>Sök</p>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
          placeholder=" Sök i filmer"
        />
      </div>
    </div>
  )
}

export default SearchComponent
