import React, { useState, useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsImageFill } from 'react-icons/bs'
import { IconContext } from "react-icons"

const CreateNewPost = ({ setOpen }) => {
  const [content, setContent] = useState('Vad gör du just nu?')
  const [addImg, setAddImg] = useState(false)
  const [image, setImage] = useState('')
  const [imageFile, setImageFile] = useState()
  const [activeUser, setActiveUser] = useState({})

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
    setImageFile(file)
  }

  const getActiveUser = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/activeuser', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        setActiveUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const createPost = async () => {
    const token = getToken()
    if(token) {
      try {
        const response = await axios.post('http://localhost:8000/api/posts', {
          content: content,
          user_id: activeUser.id,
          image: imageFile
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        setOpen(false)
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    getActiveUser()
  }, [])

  return (
    <div className="create-new-post-wrapper">
      <div className="buttons-wrapper">
        <button className="back-button" onClick={() => setOpen(false)}>
        <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
          <AiOutlineArrowLeft />
        </IconContext.Provider>
          <p>Tillbaka</p>
        </button>
        <button onClick={createPost} className="publish-button">
          <p>Publicera</p>
        </button>
      </div>
      <textarea onChange={(e) => setContent(e.target.value)} placeholder="Vad tänker du på?"></textarea>
      <div className="post-image">
        <button onClick={() => setAddImg(!addImg)}>
          <IconContext.Provider value={{ color: "black", size: "25px" }}>
            <BsImageFill />
          </IconContext.Provider>
          <p>Lägg till en bild</p>
        </button>
        {addImg &&
          <input onChange={handleFileUpload} type="file" />
        }
      </div>
      <div className="img-displayer">
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default CreateNewPost
