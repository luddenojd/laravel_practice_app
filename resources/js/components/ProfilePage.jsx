import React, { useState, useEffect } from 'react'
import { AiOutlineUser, AiOutlineArrowLeft, AiOutlineUserAdd } from 'react-icons/ai'
import { IconContext } from "react-icons"
import axios from 'axios';

const ProfilePage = ({ user, setProfile, activeUser }) => {
  const [addedFriend, setAddedFriend] = useState(false)
  const [status, setStatus] = useState([])
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
        setFriendRequests(response.data)
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
    getCorrectStatus()
  }, [])

  const getCorrectStatus = async () => {
    try {
      console.log(friendRequests)
        const temp = await friendRequests.filter((curr) => curr.user_id === user.id)
      if (temp.length > 0) {
        setStatus(temp.map((item) => item.status))
      } else {
        setStatus([]);
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  return (
    <>
      <div style={{background: user.bg_color}} className="profile-wrapper">
        {/* <IconContext.Provider value={{ color: "#495057", size: "50px" }}>
          <AiOutlineUser />
        </IconContext.Provider> */}
        <div className="back-button-container">
        <button onClick={() => setProfile(false)}>
        <IconContext.Provider value={{ color: "#495057", size: "25px" }}>
          <AiOutlineArrowLeft />
          <p className="back-info">Tillbaka till vänner</p>
        </IconContext.Provider>
        </button>
      </div>
        <img className="profile-pic" src={`storage/${user.profile_pic ? user.profile_pic : 'profile_pictures/noimage.png'}`} alt="" />
        <p>{user.name}</p>
        <p>E-mail: {user.email}</p>
        {addedFriend || status.includes('pending')
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
