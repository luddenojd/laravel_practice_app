import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FriendRequests from './FriendRequests'

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
      <p>Vänförfrågningar</p>
      <FriendRequests />
    </div>
  )
}

export default Friends
