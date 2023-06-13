import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FriendRequests from './FriendRequests'
import ClipLoader from "react-spinners/ClipLoader"
import ProfilePage from './ProfilePage'

const Friends = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState(false)

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

  const showProfile = (friend) => {
    setProfile(true)
    setUser(friend)
  }


  return (
    <div className="friends-wrapper">
      {loading ? (
        <ClipLoader />
      ) : profile ? (
        <ProfilePage user={user} />
      ) : (
        <>
          <h4>Dina vänner</h4>
          {friends?.map((friend) => (
            <button onClick={() => showProfile(friend)}>
              <p key={friend.id}>{friend.name}</p>
            </button>
          ))}
          <FriendRequests />
        </>
      )}
    </div>
  )
}

export default Friends
