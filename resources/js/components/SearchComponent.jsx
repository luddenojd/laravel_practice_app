import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchComponent = ({ setMovies, getAllMovies }) => {
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
          setMovies(response.data.movies)

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
          placeholder="Sök i filmer"
        />
      </div>
    </div>
  )
}

export default SearchComponent
