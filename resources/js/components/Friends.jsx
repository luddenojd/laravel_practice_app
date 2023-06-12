import React, { useState, useEffect } from 'react'

const Friends = () => {
  const [friends, setFriends] = useState([])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getMyFriends = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/myFriends', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response)
        setFriends(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getMyFriends()
  }, [])


  return (
    <div>
      {friends?.map((friend) => (
        <p key={friend.id}>{friend.name}</p>
      ))}
    </div>
  )
}

export default Friends
