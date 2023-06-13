import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  const getToken = () => {
    return localStorage.getItem('token')
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
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <p>Användare</p>
      {users?.map((user) => (
        <>
          <p>{user.name}</p>
          <button onClick={() => sendFriendRequest(user.id)}>
            <p>Skicka vänförfrågan till {user.name}?</p>
          </button>
        </>
      ))}
    </div>
  )
}

export default Users
