import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FriendRequests from './FriendRequests'
import ClipLoader from "react-spinners/ClipLoader"

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getMyFriends()
  }, [])


  return (
    <div className="friends-wrapper">
      <h4>Dina vänner</h4>
      {loading
      ?
      <ClipLoader />
      :
      <>
      {friends?.map((friend) => (
        <p key={friend.id}>{friend.name}</p>
      ))}
      </>
      }
      <FriendRequests />
    </div>
  )
}

export default Friends
