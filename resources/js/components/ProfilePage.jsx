import React, { useState } from 'react'
import { AiOutlineUser, AiOutlineArrowLeft, AiOutlineUserAdd } from 'react-icons/ai'
import { IconContext } from "react-icons"




const ProfilePage = ({ user, setProfile }) => {
  const [addedFriend, setAddedFriend] = useState(false)

  const getToken = () => {
    return localStorage.getItem('token')
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
  console.log(user)

  return (
    <>
      <div className="back-button-container">
        <button onClick={() => setProfile(false)}>
        <IconContext.Provider value={{ color: "#495057", size: "25px" }}>
          <AiOutlineArrowLeft />
          <p className="back-info">Tillbaka till vänner</p>
        </IconContext.Provider>
        </button>
      </div>
      <div className="profile-wrapper">
        <IconContext.Provider value={{ color: "#495057", size: "50px" }}>
          <AiOutlineUser />
        </IconContext.Provider>
        <p>Namn: {user.name}</p>
        <p>E-mail: {user.email}</p>
        {addedFriend
        ?
        <p>Vänförfrågan har skickats!</p>
        :
        <button onClick={() => sendFriendRequest(user.id)}>
        <AiOutlineUserAdd />
        <p>Skicka vänförfrågan till {user.name}?</p>
      </button>
        }

      </div>
    </>
  )
}

export default ProfilePage
