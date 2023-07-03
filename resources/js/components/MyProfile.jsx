import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { BsImageFill } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { IconContext } from "react-icons"

const MyProfile = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user.profile_pic ? user.profile_pic : 'profile_pictures/noimage.png')
  const [editPicture, setEditPicture] = useState(false)
  const [editName, setEditName] = useState(false)
  const [editAge, setEditAge] = useState(false)
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
        setName(response.data.name)
        setEditName(false)
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

  const handleKey = (e) => {
    if(e.key === "Enter") {
      updateInfo()
    }
  }

  const cancelEdit = () => {
    setName(name.length ? name : user.name)
    setEditName(false)
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
      {loading
        ?
        <ClipLoader />
        :
        <div className="profile-pic-frame">
          <img className="profile-pic" src={`storage/${profilePic}`} alt="Profile image" />
          {!editPicture &&
            <button className="change-pic-button" onClick={() => setEditPicture(true)}>
              <IconContext.Provider value={{ color: "black", size: "25px" }}>
                <BsImageFill />
              </IconContext.Provider>
            </button>
          }
        </div>
      }
      {editPicture
        &&
        <div className="uploader">
        <input type="file" onChange={handleFileUpload} />
        <button onClick={() => setEditPicture(false)}>
          <p>Avbryt</p>
        </button>
        </div>
      }
      <div className="edit-name">
        <h1>{name}</h1>
        <button onClick={() => setEditName(!editName)}>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <AiOutlineEdit />
          </IconContext.Provider>
        </button>
      </div>
      {editName &&
      <div className="edit-button-wrapper">
        <input type="text"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
        />
        <button className="save-button" onClick={updateInfo}>
          Spara
        </button>
        <button className="cancel-button" onClick={cancelEdit}>
          <p>Avbryt</p>
        </button>
      </div>
      }
      <div className="edit-name">
        <p>{birthdate}</p>
        <button onClick={() => setEditAge(!editAge)}>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <AiOutlineEdit />
          </IconContext.Provider>
        </button>
      </div>
      <p>Medlem sedan {user.created_at.slice(0, 10)}</p>
      <p>{description}</p>
    </div>
  )
}

export default MyProfile
