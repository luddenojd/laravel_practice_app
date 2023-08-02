import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { BsImageFill } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { IconContext } from "react-icons"
import Inbox from './Inbox'


const MyProfile = ({ user, setAlert, setBgColor, bgColor }) => {
  const [profilePic, setProfilePic] = useState(user.profile_pic ? user.profile_pic : 'profile_pictures/noimage.png')
  const [editPicture, setEditPicture] = useState(false)
  const [editName, setEditName] = useState(false)
  const [editAge, setEditAge] = useState(false)
  const [editDesc, setEditDesc] = useState(false)
  const [name, setName] = useState(user.name)
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [description, setDescription] = useState(user.description)
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
        setBirthdate(response.data.birthdate)
        setDescription(response.data.description)
        setBgColor(response.data.bg_color)
        setEditName(false)
        setEditAge(false)
        setEditDesc(false)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setBgColor(user.bg_color)
  }, [])

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

  const handleNameKey = (e) => {
    if(e.key === "Enter") {
      updateInfo()
    }
  }

  const handleAgeKey = (e) => {
    if(e.key === "Enter") {
      updateInfo()
    }
  }

  const handleDescKey = (e) => {
    if(e.key === "Enter") {
      updateInfo()
    }
  }

  const cancelEdit = (check) => {
    if(check === 'name') {
      setName(name.length ? name : user.name)
      setEditName(false)
    }
    if(check === 'age') {
      setBirthdate(birthdate.length ? birthdate : user.birthdate)
      setEditAge(false)
    }
    if(check === 'desc') {
      setDescription(description.length ? description : user.description)
      setEditDesc(false)
    }
  }

  const changeBgColor = (color) => {
    setBgColor(color)
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
        onKeyDown={(e) => handleNameKey(e)}
        />
        <button className="save-button" onClick={updateInfo}>
          Spara
        </button>
        <button className="cancel-button" onClick={() => cancelEdit('name')}>
          <p>Avbryt</p>
        </button>
      </div>
      }
      <div className="edit-name">
        <p>Född: {birthdate}</p>
        <button onClick={() => setEditAge(!editAge)}>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <AiOutlineEdit />
          </IconContext.Provider>
        </button>
      </div>
      {editAge &&
        <div className="edit-button-wrapper">
          <input type="text"
          onChange={(e) => setBirthdate(e.target.value)}
          onKeyDown={(e) => handleAgeKey(e)}
          />
          <button className="save-button" onClick={updateInfo}>
            Spara
          </button>
          <button className="cancel-button" onClick={() => cancelEdit('age')}>
            <p>Avbryt</p>
          </button>
        </div>
        }
      <div className="edit-name">
        <p>{description}</p>
        <button onClick={() => setEditDesc(!editDesc)}>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <AiOutlineEdit />
          </IconContext.Provider>
        </button>
      </div>
      {editDesc &&
        <div className="edit-button-wrapper">
          <input
            type="text"
            className="about-me-input"
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => handleDescKey(e)}
          />
          <button className="save-button" onClick={updateInfo}>
            Spara
          </button>
          <button className="cancel-button" onClick={() => cancelEdit('desc')}>
            <p>Avbryt</p>
          </button>
        </div>
        }
      <p>Medlem sedan {user.created_at.slice(0, 10)}</p>
      <div className="change-bg-color">
      <select onChange={(e) => changeBgColor(e.target.value)} name="" id="">  <option value={user.bg_color}>Ändra färg</option>
        <option value="#FFFFFF">Vit</option>
        <option value="#FF5733">Röd</option>
        <option value="#FFD133">Gul</option>
        <option value="#B8FF33">Grön</option>
        <option value="#33FFB8">Blå</option>
      </select>
      <button onClick={updateInfo}>
        <p>Spara bakgrundsfärg</p>
      </button>
      </div>
      {/* <Inbox /> */}
    </div>
  )
}

export default MyProfile
