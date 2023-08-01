import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import ProfilePage from './ProfilePage'
import { AiOutlineUser } from 'react-icons/ai'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState(false)
  const [activeUser, setActiveUser] = useState({})

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getActiveUser = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/activeuser', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setActiveUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }


  const getAllUsers = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/allusers', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const sendFriendRequest = async (id) => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post('http://localhost:8000/api/sendFriendRequest', {
          friend_id: id
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showProfile = (friend) => {
    setProfile(true)
    setUser(friend)
  }

  useEffect(() => {
    getAllUsers()
    getActiveUser()
  }, [])

  return (
    <div className="allusers-wrapper">
      {loading
      ?
      <ClipLoader />
      :
      profile
      ?
      <ProfilePage setProfile={setProfile} user={user} activeUser={activeUser} />
      :
      <div className="button-wrapper">
      <p>Användare:</p>
      {users?.map((user) => (
        <button onClick={() => showProfile(user)}>
          <AiOutlineUser />
          <p key={user.id}>{user.name}</p>
        </button>
      ))}
      </div>
      }

    </div>
  )
}

export default Users
