import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchComponent = () => {
  const [query, setQuery] = useState('')

  const goFind = async () => {
    if(query !== '') {
      try {
        const response = await axios.post('http://localhost:8000/api/search', {
          query: query
        },
        {
          withCredentials: true,
        })

      } catch (error) {

      }
    }
  }

  const handleKey = (e) => {
    if(e.key === "Enter") {
      goFind()
    }
  }

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
