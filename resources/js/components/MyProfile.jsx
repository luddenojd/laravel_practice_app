import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"

const MyProfile = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user.profile_pic ? user.profile_pic : 'profile_pictures/noimage.png')
  const [editPicture, setEditPicture] = useState(false)
  const [name, setName] = useState(user.name)
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [description, setDescription] = useState(user.description)
  const [bgColor, setBgColor] = useState(user.bg_color)
  const [fontColor, setFontColor] = useState(user.font_color)
  const [loading, setLoading] = useState(true)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setProfilePic(file)
  }

  const updateInfo = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.put(`http://localhost:8000/api/updateuser/${user.id}`, {
          name: name,
          birthdate: birthdate,
          description: description,
          bg_color: bgColor,
          font_color: fontColor,
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

  const updateProfilePic = async () => {
    const token = getToken()
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/user/${user.id}/update-profile-picture`, {
            profile_pic: profilePic
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        )
        setProfilePic(response.data.profile_pic)
        setEditPicture(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if(profilePic !== null) {
      updateProfilePic()
    }
  }, [profilePic])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  return (
    <div className="my-profile-wrapper">
      {editPicture
          ?
          <>
          <input type="file" onChange={handleFileUpload} />
          <button>
            <p onClick={() => setEditPicture(false)}>Avbryt</p>
          </button>
          </>
          :
          <button onClick={() => setEditPicture(true)}>
            <p>Ändra profilbild</p>
          </button>
      }
      {loading
        ?
        <ClipLoader />
        :
        <img className="profile-pic" src={`storage/${profilePic}`} alt="Profile image" />
      }

      <h1>{user.name}</h1>
      <p>{user.birthdate}</p>
      <p>Medlem sedan {user.created_at}</p>
      <p>{user.description}</p>
    </div>
  )
}

export default MyProfile
