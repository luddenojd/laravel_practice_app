import React, { useState, useEffect } from 'react'

const SearchComponent = () => {
  const [query, setQuery] = useState('')

  const goFind = () => {
    console.log(query)
  }

  const handleKey = () => {
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
