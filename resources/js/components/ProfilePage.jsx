import React, { useState, useEffect } from 'react'
import { AiOutlineUser, AiOutlineArrowLeft, AiOutlineUserAdd } from 'react-icons/ai'
import { IconContext } from "react-icons"
import axios from 'axios';

const ProfilePage = ({ user, setProfile, activeUser }) => {
  const [addedFriend, setAddedFriend] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getFriendRequests = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/myFriendRequests', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFriendRequests(response.data.filter((curr) => curr.friend_id === user.id))
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
        setAddedFriend(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getFriendRequests()
  }, [])

  return (
    <>
      <div style={{background: user.bg_color}} className="profile-wrapper">
        <div className="back-button-container">
        <button onClick={() => setProfile(false)}>
        <IconContext.Provider value={{ color: "#495057", size: "25px" }}>
          <AiOutlineArrowLeft />
          <p className="back-info">Alla användare</p>
        </IconContext.Provider>
        </button>
      </div>
        <img className="profile-pic" src={`storage/${user.profile_pic ? user.profile_pic : 'profile_pictures/noimage.png'}`} alt="" />
        <p>{user.name}</p>
        <p>{user.birthdate}</p>
        <p>{user.email}</p>
        <p>{user.description}</p>
        {addedFriend || friendRequests[0]?.status === 'pending'
        ?
        <p>Vänförfrågan har skickats!</p>
        :
        !user.friends
        ?
        <button onClick={() => sendFriendRequest(user.id)}>
        <AiOutlineUserAdd />
        <p>Skicka vänförfrågan till {user.name}?</p>
      </button>
      :
      <p>Ni är vänner!</p> }
      </div>
    </>
  )
}

export default ProfilePage
